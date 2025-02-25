/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(userPassword: string): Promise<boolean>;
  generateToken(): string;
}

// export interface UserModel extends Model<TUser> {
//   isPasswordMatched(
//     plainTextPassword: string,
//     hashedPassword: string,
//   ): Promise<boolean>;
// }

type TUserModel = Model<IUser, {}, IUserMethods>;

export default TUserModel;
