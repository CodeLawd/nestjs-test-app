import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/common/roles';

export enum UserType {
  Learner = 'learner',
  Admin = 'admin',
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ lowercase: true })
  roles?: Role[];

  @Prop({ default: UserType.Learner })
  userType: string;

  @Prop({ default: 'campus.landalearn.org' })
  redirectUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
