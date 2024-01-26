/* eslint-disable prefer-const */
import { ErrorRequestHandler } from "express";
import handleDuplicateError from "../error/handleDuplicateError";
import { TErrorSources } from "../interface/error";
import AppError from "../utils/AppError";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'something went wrong!'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'something went wrong'
    }
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }


  return res.status(statusCode).json({
    success: false,
    message,
    error: errorSources,
    err
  })
}