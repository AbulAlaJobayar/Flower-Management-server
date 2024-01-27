import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { productService } from "./product.service";

const createProductIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await productService.createdProductIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Flower created successfully!',
        data: result,
    });
})
const getProductIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await productService.getAllProductIntoDB(req.query)
    const { meta, data } = result
    res.status(httpStatus.OK).json({
        success: true,
        meta,
        message: 'Flower retrieved successfully!',
        data,
    })
})
const getSingleProductInDB = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await productService.getSingleProductIntoDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Flower retrieved successfully!',
        data: result,
    });
})
const updateProductIntoDB = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await productService.updateProductIntoDB(req.user, id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Flower Update successfully!',
        data: result,
    });
})
const deleteProductIntoDB = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await productService.delateProductIntoDB(req.user, id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Flower delate successfully!',
        data: result,
    });
})
export const productController = {
    createProductIntoDB,
    getProductIntoDB,
    getSingleProductInDB,
    updateProductIntoDB,
    deleteProductIntoDB
}