import { Types } from 'mongoose';

export type TOrder = {
  user: Types.ObjectId;
  email: string;
  product: {
    product: Types.ObjectId;
    quantity: number;
  };
  totalPrice: number;
  status: string;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};
