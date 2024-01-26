/* eslint-disable prefer-const */
import { ErrorRequestHandler } from "express";
import handleDuplicateError from "../error/handleDuplicateError";
import { TErrorSources } from "../interface/error";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 5000
    let message = 'something went wrong!'
    let errorSources:TErrorSources = [
        {
            path: '',
            message: 'something went wrong'
        }
    ]

if(err?.code===11000){
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources; 
}


    return res.status(statusCode).json({
        success: false,
        message,
        error:errorSources,
        err
    })
}