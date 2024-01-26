import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
   name:{
    type:String,required:[true,'please provide flower name']
   },
   price:{
    type:Number,required:[true,'please provide flower price!']
   },
   quantity:{
    type:Number,required:[true,'please provide flower quantity!']
   }
  })
 export const Product =model<TProduct>('Product',productSchema);