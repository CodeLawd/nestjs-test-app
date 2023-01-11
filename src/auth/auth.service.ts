import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './../entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import SendChamp from 'src/common/utils/sendchamp';
import { VerifyDto, ResendOtp } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  // Validate a user
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ email: username });
    if (!user) throw new NotFoundException('Email does not exists');

    const isMatch = await argon.verify(user.password, password);
    if (!isMatch) throw new ForbiddenException('Invalid Credentials');

    if (user && isMatch) return user;

    return null;
  }

  async sendUserWithToken(user: any) {
    const payload = { username: user.email, sub: user._id, roles: user.roles };

    return {
      access_token: this.jwtService.sign(payload),
      data: user,
    };
  }

  /*
   *  Register a User
   */
  async register(createUserDto: CreateUserDto) {
    const { password, email, userType, ...rest } = createUserDto;

    let redirectUrl: string;

    // Check if email already exists
    const isRegistered = await this.userRepository.findOne({ email });
    if (isRegistered)
      throw new ForbiddenException('Email is already registred');

    // Checking user type and assigning a redirect url
    userType === 'learner' || !userType
      ? (redirectUrl = process.env.CAMPUS_REDIRECT_URL)
      : (redirectUrl = process.env.HQ_REDIRECT_URL);

    // Hash users password
    const hash = await argon.hash(password);

    // Save user
    const user = await this.userRepository.create({
      ...rest,
      email,
      redirectUrl,
      userType,
      password: hash,
    });

    this.eventEmitter.emit('user.created', user);

    return user;
  }

  /*
   * Verify Users OTP
   */
  async verifyOtp(data: VerifyDto) {
    const user = await this.userRepository.findOne({ email: data.email });

    if (!user)
      throw new NotFoundException(`User with ${data.email} does not exists`);

    const response = await SendChamp.verifyOtp({
      data: { otp: data.otp, reference: user.sendchampReference },
    });

    if (response.code == 200) {
      this.eventEmitter.emit('user.verified', {
        firstName: user.firstName,
        email: user.email,
      });
    }

    return true;
  }

  /*
   *  Resend OTP
   */
  async resendOtp(data: ResendOtp) {
    const user = await this.userRepository.findOne({ email: data.email });
    if (!user)
      throw new NotFoundException(`User with ${data.email} does not exists`);

    this.eventEmitter.emit('resend.otp', user);

    return true;
  }
}
