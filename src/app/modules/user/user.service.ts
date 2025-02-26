<<<<<<< HEAD
import { User } from './user.model';
import { IUser } from './user.interface';
=======
import { IUser } from './user.interface';
import User from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
>>>>>>> 3be8c7d5e842ce820837775741fe6bbf239e1585

const registerUserIntoDB = async (userData: IUser) => {
  const user = new User(userData);
  const result = await user.save();
  return result;
};

const loginUser = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email }).select(
    'password email role',
  );
  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid email or password');
  }

  const accessToken = await user.generateToken();
  return accessToken;
};
export const UserServices = {
  registerUserIntoDB,
  loginUser,
};
