import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/common/roles';

export enum UserType {
  Learner = 'learner',
  Admin = 'admin',
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty()
  @Prop({ required: true })
  firstName: string;
  
  @ApiProperty()
  @Prop({ required: true })
  lastName: string;
  
  @ApiProperty()
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;
  
  @ApiProperty()
  @Prop({ required: true })
  phone: string;
  
  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ lowercase: true })
  roles?: Role[];
  
  @Prop({ default: UserType.Learner })
  userType: string;
  
  @Prop({ default: 'campus.landalearn.org' })
  redirectUrl: string;
  
  @Prop()
  sendchampReference?: string;
  
  @ApiProperty()
  @Prop({ default: false })
  isVerified?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
