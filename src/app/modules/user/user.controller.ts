import { Request, Response } from 'express';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const result = await UserServices.registerUserIntoDB(userData);
    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Something went wrong',
      success: false,
      error: err,
      stack: err.stack,
    });
  }
});

const loginUser = catchAsync(async (req, res) => {
  const data = await UserServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: 'Logged in Successfully',
    data,
  });
});

export const UserControllers = {
  registerUser,
  loginUser,
};
