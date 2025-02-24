import { TLoginUser } from './auth.interface';

const loginUser = async (payLoad: TLoginUser) => {
  console.log(payLoad);
  return {};
};

export const AuthServices = {
  loginUser,
};
