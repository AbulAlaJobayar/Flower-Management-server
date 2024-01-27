/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import QueryBuilder from 'mongoose-dynamic-querybuilder';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
const createdProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};
const getAllProductIntoDB = async (payload: any) => {
  const productQuery = new QueryBuilder(Product.find({}), payload);
  const [data, totalData] = await Promise.all([
    productQuery
      .filter()
      .search([
        'name',
        'price',
        'bloomDate',
        'quantity',
        'color',
        'category',
        'size',
        'fragrance',
      ]) // to make dynamic search use like ['']
      .sort()
      .paginate()
      .fields().modelQuery,
    productQuery.countTotal(),
  ]);
  const limit = Number(payload.limit) || 10;
  const meta = {
    limit,
    page: Number(payload.page) || 1,
    total: totalData,
    totalPage: Math.ceil(totalData / limit),
  };
  return {
    meta,
    data,
  };
};
const getSingleProductIntoDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};
const updateProductIntoDB = async (
  userData: JwtPayload,
  id: string,
  payload: Partial<TProduct>,
) => {
  const { id: tokenId, name, email } = userData;
  const user = await User.findOne({ _id: tokenId });
  if (!user?.email === email) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!user?.name === name) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const delateProductIntoDB = async (userData: JwtPayload, id: string) => {
  const { id: tokenId, name, email } = userData;
  const user = await User.findOne({ _id: tokenId });
  if (!user?.email === email) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!user?.name === name) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }
  const result = await Product.findByIdAndDelete(id);
  return null;
};
export const productService = {
  createdProductIntoDB,
  getAllProductIntoDB,
  getSingleProductIntoDB,
  updateProductIntoDB,
  delateProductIntoDB,
};
