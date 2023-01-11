import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard, Public } from './passport';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { VerifiedUser, VerifyDto } from './dto/verify.dto';
import { ApiCreatedResponse, ApiTags, ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entity';
import { ResendOtp, ResentOtp } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiCreatedResponse({ type: User, description: 'expected response' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return await this.authService.sendUserWithToken(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return await this.authService.sendUserWithToken(req);
  }

  @Public()
  @ApiCreatedResponse({ type: VerifiedUser })
  @Post('verify')
  async verifyOtp(@Body() data: VerifyDto) {
    const response = await this.authService.verifyOtp(data);
    if (response)
      return { message: 'Your account has been verified successfully' };
  }

  @Public()
  @ApiCreatedResponse({ type: ResentOtp })
  @Post('resend-otp')
  async resendOtp(@Body() data: ResendOtp) {
    const response = await this.authService.resendOtp(data);
    if (response) return { message: 'A new OTP has been sent to your email' };
  }
}
