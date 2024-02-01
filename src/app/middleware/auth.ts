import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';
import httpStatus from 'http-status';
import { verifyToken } from '../utils/tokenUtils';
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'invalid JWT');
    }

    let decoded;

    try {
       decoded = verifyToken(token, config.jwt_access_secret);
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }


    
    const { id, name, email } = decoded as JwtPayload;
    // check user
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'user not authorized');
    }
    // check email
    if (!user.email === email) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'user not authorized');
    }
    // check name
    if (!user.name === name) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'user not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
