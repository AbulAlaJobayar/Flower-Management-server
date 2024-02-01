import { Schema, model } from 'mongoose';
import { TSales } from './sales.interface';

const salesSchema = new Schema<TSales>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    purchase: {
      type: Number,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    totalPrice:{
      type:Number
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);
export const Sales = model<TSales>('Sales', salesSchema);
