import { Types } from 'mongoose';

export type TSales = {
  productId: Types.ObjectId;
  purchase: number;
  buyerName?: string;
  totalPrice?:number;
  date?: Date;
  userId?: Types.ObjectId;
};
