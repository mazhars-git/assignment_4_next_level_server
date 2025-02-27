import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking the token is sending from client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,

      // function (err, decoded) {
      //   if (err) {
      //     throw new AppError(
      //       httpStatus.UNAUTHORIZED,
      //       'You are not authorized!',
      //     );
      //   }
      //   if (requiredRoles && requiredRoles.includes(role)) {
      //     throw new AppError(
      //       httpStatus.UNAUTHORIZED,
      //       'You are not authorized!',
      //     );
      //   }
      //   req.user = decoded as JwtPayload;
      // }
    ) as JwtPayload;

    const { role, email, iat } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = user;

    next();
  });
};

export default auth;
