import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/roles';
import { UserType } from 'src/entity';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsEnum(Role)
  @IsOptional()
  roles: Role[];

  @IsEnum(UserType)
  @IsOptional()
  userType?: string;
}
