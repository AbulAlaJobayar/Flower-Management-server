import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";
import config from "../../config";

const createUser = catchAsync(async (req, res) => {

    const result = await userService.createUserIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'registered successfully',
        data: result
    })
})
const loginUser = catchAsync(async (req, res) => {
    const result = await userService.loginUser(req.body)
    const { accessToken, refreshToken } = result
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config.node_env === "production",
    })
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Login successfully',
        data: accessToken
    })
})
const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
  
    const result = await userService.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token is retrieved successfully!',
        data: result,
    });
});
export const userController = {
    createUser,
    loginUser,
    refreshToken
}