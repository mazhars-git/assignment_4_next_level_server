import { IUser } from './user.interface';
import { User } from './user.model';

const registerUserIntoDB = async (userData: IUser) => {
  const user = new User(userData);
  const result = await user.save();
  return result;
};

export const UserServices = {
  registerUserIntoDB,
};
