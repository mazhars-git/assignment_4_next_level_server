import { User } from './user.model';
import { IUser } from './user.interface';

const registerUserIntoDB = async (userData: IUser) => {
  const user = new User(userData);
  const result = await user.save();
  return result;
};

export const UserServices = {
  registerUserIntoDB,
};
