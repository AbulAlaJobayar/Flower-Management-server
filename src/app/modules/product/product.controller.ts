import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { productService } from "./product.service";

const createProductIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result =await productService.createdProductIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Flower created successfully!',
        data: result,
    });
})
export const productController = {
    createProductIntoDB
}