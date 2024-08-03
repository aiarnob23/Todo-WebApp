import catchAsync from "./catchAsync";
import { todoInstance } from "./getAxiosBaseUrl";
import { getUserId } from "./getUserDetails";

//get email and date based todos
export const getTodos = catchAsync(async (email, date) => {
  const userId = await getUserId(email);
  const response = await todoInstance.get(`todo?id=${userId}&date=${date}`);
  return response.data.data || [];
});
//get all incompleted todos
export const getIncompletedTodos = catchAsync(async (email) => {
  const userId = await getUserId(email);
  const response = await todoInstance.get(`todo/incomplete-todos/${userId}`);
  return response.data.data || [];
});
//get all completed todos
export const getCompletedTodos = catchAsync(async (email) => {
  const userId = await getUserId(email);
  const response = await todoInstance.get(`todo/completed-todos/${userId}`);
  return response.data.data || [];
});
//get all trashed todos
export const getTrashTodos = catchAsync(async (email) => {
  const userId = await getUserId(email);
  const response = await todoInstance.get(`todo/trash/${userId}`);
  return response.data.data || [];
});
