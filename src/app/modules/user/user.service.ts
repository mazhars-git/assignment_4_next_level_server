import { IUser } from './user.interface';
import User from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const registerUserIntoDB = async (userData: IUser) => {
  const user = new User(userData);
  const result = await user.save();
  return result;
};

const loginUser = async (payload: IUser) => {
  const user = await User.findOne({
    email: payload.email,
    password: payload.password,
  }).select('password email role');
  console.log(user);

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }
  if (!user || !(await user.comparePassword(payload.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid email or password');
  }

  const accessToken = await user.generateToken();
  return accessToken;
};
export const UserServices = {
  registerUserIntoDB,
  loginUser,
};
