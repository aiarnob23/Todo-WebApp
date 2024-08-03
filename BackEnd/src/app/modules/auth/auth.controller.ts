import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";


const loginUserToken = catchAsync(async (req, res) => {
    const email = req.body;
    const token = await authServices.loginUser(email);

        res.cookie("token", token, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    
        res.cookie("userEmail", email, {
          secure: true,
          httpOnly: true,
            sameSite: "none",
          maxAge:7*24*60*60*1000,
        });
    
    sendResponse(res, {
      stautsCode: httpStatus.OK,
      success: true,
    
      message: "Access approved",
      data: token,
    });
})

export const authControllers = {
    loginUserToken,
}