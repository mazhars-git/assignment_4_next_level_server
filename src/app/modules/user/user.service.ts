import mongoose from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';

const registerUserIntoDB = async (userData: TUser) => {
  const user = new User(userData);
  const result = await user.save();
  return result;
};

export const UserServices = {
  registerUserIntoDB,
};
