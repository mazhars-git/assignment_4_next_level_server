import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import AppError from '../../errors/AppError';

const loginUser = async (payLoad: TLoginUser) => {
  // checking if the user is exist
  const isUserExists = await User.findOne({ id: payLoad?.id });
  console.log(payLoad);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  return {};
};

export const AuthServices = {
  loginUser,
};
