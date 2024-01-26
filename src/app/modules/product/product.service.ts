import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createdProductIntoDB=async(payload:TProduct)=>{
const result=await Product.create(payload)
return result
}
export const productService={
    createdProductIntoDB
}