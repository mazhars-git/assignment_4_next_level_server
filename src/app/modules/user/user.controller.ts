import { Request, Response } from 'express';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

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

export const UserControllers = {
  registerUser,
};
