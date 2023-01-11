import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendOtp {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResentOtp {
  @ApiProperty({ example: 'A new OTP has been sent to your email' })
  message: string;
}
