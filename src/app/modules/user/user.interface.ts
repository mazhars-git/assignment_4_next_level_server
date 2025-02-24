import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
  createdAt: Date;
  updatedAt: Date;
};
