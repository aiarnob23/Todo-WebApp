import catchAsync from "./catchAsync";
import { todoInstance } from "./getAxiosBaseUrl";

//get user details
export const userDetails = catchAsync(async (email) => {
  const res = await todoInstance.get(`user/user-detail?email=${email}`);
  return res.data;
});
//get user id
export const getUserId = catchAsync(async (email) => {
  const payload = await userDetails(email);
  const userId = payload?.data[0]?._id || null;
  return userId;
});
