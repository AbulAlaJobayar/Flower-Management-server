import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {

    const result =await userService.createUser(req.body)
    console.log(result)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'registered successfully',
        data: result
    })
})
export const userController = {
    createUser
}