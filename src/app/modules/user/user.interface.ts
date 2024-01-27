import { Types } from 'mongoose';

type parches = {
  productId: Types.ObjectId;
  quantity: number;
};
export type TUser = {
  name: string;
  email: string;
  password: string;
  parchesHistory?: parches[];
};
