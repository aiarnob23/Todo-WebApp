import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUserToken = catchAsync(async (req, res) => {
  const email = req.body;
  const token = await authServices.loginUser(email);
  console.log("token chise ....... from: controller");
  // Clear old cookies
  res.cookie("token", "", {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 0,
  });

  res.cookie("userEmail", "", {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 0,
  });

  //Set new cookies
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
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  console.log(token);

  sendResponse(res, {
    stautsCode: httpStatus.OK,
    success: true,

    message: "Access approved",
    data: token,
  });
});

export const authControllers = {
  loginUserToken,
};
