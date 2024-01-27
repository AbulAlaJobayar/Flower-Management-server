/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import QueryBuilder from "mongoose-dynamic-querybuilder";
const createdProductIntoDB = async (payload: TProduct) => {
    const result = await Product.create(payload)
    return result
}
const getAllProductIntoDB = async (payload: any) => {
    const productQuery = new QueryBuilder(Product.find({}), payload)
    const [data, totalData] = await Promise.all([
        productQuery
            .filter()
            .search(["name", "price", "quantity", "color", "category", "size", "fragrance"]) // to make dynamic search use like ['']
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
        meta, data
    }
}
const getSingleProductIntoDB= async(id:string)=>{
const result=await Product.findById(id)
return result
}
const updateProductIntoDB= async(id:string, payload:TProduct)=>{
const result=await Product.findByIdAndUpdate(id,)
return result
}
export const productService = {
    createdProductIntoDB,
    getAllProductIntoDB,
    getSingleProductIntoDB,
    updateProductIntoDB
}