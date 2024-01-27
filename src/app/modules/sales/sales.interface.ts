import { Types } from 'mongoose';

export type TSales = {
  productId: Types.ObjectId;
  purchase: number;
  buyerName?: string;
  date?: Date;
  userId?: Types.ObjectId;
};
