import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import AppError from '../../errors/AppError';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payLoad: TLoginUser) => {
  // checking if the user is exist

  const user = await User.isUserExistsByEmail(payLoad.email);
  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking the password is correct
  if (!(await User.isPasswordMatched(payLoad?.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched!');
  }

  const jwtPayload = {
    userEmail: user,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
