import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUserToken = catchAsync(async (req, res) => {
  const email = req.body;
  const token = await authServices.loginUser(email);

  sendResponse(res, {
    stautsCode: httpStatus.OK,
    success: true,

    message: "Access approved",
    data: {token, email},
  });
});

export const authControllers = {
  loginUserToken,
};
