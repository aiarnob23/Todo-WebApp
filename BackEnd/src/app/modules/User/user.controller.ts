import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { genUserId } from "../../utils/randomIdGenerator";
import sendResponse from "../../utils/sendResponse";
import { TUser } from "./user.interface";
import { userServices } from "./user.service";

//create new user
const addNewUser = catchAsync(async (req, res) => {
    const user = req.body;
    console.log(req.body);
    const userId = genUserId();
    const userData: TUser = { ...user, userId };
    console.log(userData);
    const result = await userServices.addNewUser(userData);
    console.log(result);
    sendResponse(res, {
        success: true,
        stautsCode: httpStatus.OK,
        data:result,
    })
})
//get user data
const getUserData = catchAsync(async (req, res) => {
    const email  = req.query.email;
    const result = await userServices.getUserData(email as string);
    sendResponse(res, {
        success: true,
        stautsCode: httpStatus.OK,
        data:result,
    })
})

export const userControllers = {
    addNewUser,
    getUserData,
}