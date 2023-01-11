import { UserRepository } from './../entity/users.repository';
import { Injectable } from '@nestjs/common';
import SendChamp from 'src/common/utils/sendchamp';

@Injectable()
export class SyncService {
  constructor(private readonly userRepository: UserRepository) {}
  // This event is only triggered after successfully sign up
  async handleUserCreated(data: any) {
    /*
     *  Send OTP to user to validate users email address
     */
    const response = await SendChamp.sendOtp(data);

    console.log(response);

    /*
     *  Update UserModel with the generated reference for the OTP
     */
    if (data && response) {
      await this.userRepository.findOneAndUpdate(
        { _id: data?._id },
        { sendchampReference: response.data.reference },
      );
    }
  }

  async handleUserVerified(data: any) {
    /*
     *  Update verification status of the user if OTP is correct
     */
    await this.userRepository.findOneAndUpdate(
      { email: data?.email },
      { isVerified: true },
    );

    return await SendChamp.sendEmail(data);
  }

  async handleResendOtp(data: any) {
    await this.handleUserCreated(data);
  }

  handleUserLogin() {}
  handleUserUpdated() {}
}
