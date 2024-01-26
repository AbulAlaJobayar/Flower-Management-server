import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notFound=(req:Request,res:Response,next:NextFunction)=>{
return res.status(httpStatus.NOT_FOUND).json({
   success:false,
   message:"Api not Found" ,
   error:' '
})
}