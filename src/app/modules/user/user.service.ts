//import { notFound } from './../../middleware/notFound';
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status"
import jwt from 'jsonwebtoken';
import AppError from "../../utils/AppError"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import comparPassword from '../../utils/compairPassword';
import config from "../../config";
import { createToken, verifyToken } from "../../utils/tokenUtils";


const createUserIntoDB = async (payload: TUser) => {
    // create user
    const result = await User.create(payload)
    //send response without password,
    const { password, ...otherField } = result.toObject()
    return otherField
}
const loginUser = async (payload: { email: string; password: string }) => {
    console.log(payload)
    // check user
    const user = await User.findOne({ email: payload.email })
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not Found')
    }
    // check password 
    const password = comparPassword(payload.password, user.password)
    if (!password) {
        throw new AppError(httpStatus.FORBIDDEN, 'Your password is incorrect')
    }
    const jwtPayload = {
        id: user._id,
        name: user.name,
        email: user.email
    }
    // create access Token
    const accessToken = createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expire_in)
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expire_in)
    return {
        accessToken,
        refreshToken
    }
}

const refreshToken = async (token: string) => {
   
    // checking if the given token is valid
    const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  console.log(decoded)
    const { id,name,email } = decoded;
  
    // checking if the user is exist
    const user = await User.findOne({email:email})
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not Found')
    }
   
    const userName = await User.findOne({name:name})
    if (!userName) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not Found')
    }
   
    const userId= await User.findOne({_id:id})
    if (!userId) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not Found')
    }
 console.log(userId)
    const jwtPayload = {
        id: user._id,
        name: user.name,
        email: user.email
    }
  
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expire_in as string,
    );
  
    return {
      accessToken,
    };
  };
  


export const userService = {
    createUserIntoDB,
    loginUser,
    refreshToken
}