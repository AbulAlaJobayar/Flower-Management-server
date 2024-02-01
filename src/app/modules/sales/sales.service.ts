import mongoose from 'mongoose';
import { Product } from '../product/product.model';
import { TSales } from './sales.interface';
import { Sales } from './sales.model';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const createSaleIntoDB = async (userData: JwtPayload, payload: TSales) => {
  const { id: tokenId, name } = userData;
  const session = await mongoose.startSession();

  console.log(userData, payload)
  try {
    session.startTransaction();
    const { productId, purchase } = payload;

    // Find the product
    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Product not found');
    }
    const productQuantity = product.quantity;

    // Check if there is enough quantity
    if (productQuantity < purchase) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Insufficient Product Quantity',
      );
    }


    // Update product quantity
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: product._id },
      { quantity: Number(productQuantity) - Number(purchase) },
      { new: true, runValidators: true },
    ).session(session);

    if (!updatedProduct) {
      throw new AppError(
        httpStatus.NOT_MODIFIED,
        'Failed to update product quantity',
      );
    }
    payload.buyerName = name;
    payload.userId = tokenId;
    payload.totalPrice = Number(product.price) * Number(purchase)
    // Create a new sale
    const sale = await Sales.create([payload], { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return sale;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Rollback the transaction
    await session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};
const getAllSalesIntoDB = async () => {
  const result = await Sales.find()
    .populate({ path: 'productId' })
    .populate({ path: 'userId' })
    .exec();
  return result;
};
export const salesService = {
  createSaleIntoDB,
  getAllSalesIntoDB,
};
