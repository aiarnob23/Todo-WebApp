import { TodoServices } from "./todo.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { TtodoStatus } from "./todo.interface";

//insert new todo
const addNewTodo = catchAsync(async (req, res) => {
  const newTodo = req.body;
  const result = await TodoServices.addNewTodo(newTodo);
  sendResponse(res, {
    stautsCode: httpStatus.OK,
    success: true,
    message: "Todo created successfully",
    data: result,
  });
});
//get todos by user id and date
const getUserTodos = catchAsync(async (req, res) => {
  const id: any = req.query.id;
  const date: any = req.query.date;
  const result = await TodoServices.getTodosByIdAndDate(id, date);
  sendResponse(res, {
    stautsCode: httpStatus.OK,
    success: true,
    message: "Todo fetched successfully",
    data: result,
  });
});
//get all incompleted todos of user
const getUserIncompletedTodos = catchAsync(async (req, res) => {
  const id: any = req.params.id;
  const result = await TodoServices.getIncompletedTodos(id);
  sendResponse(res, {
    stautsCode: httpStatus.OK,
    success: true,
    message: "Upcoming todos fetched successfully",
    data: result,
  });
});
//get all completed todos of user
const getUserCompletedTodos = catchAsync(async (req, res) => {
  const id: any = req.params.id;
  const result = await TodoServices.getCompletedTodos(id);
  sendResponse(res, {
    stautsCode: httpStatus.OK,
    success: true,
    message: "Upcoming todos fetched successfully",
    data: result,
  });
});
//get all softDeleted(trash) todos of user
const getSoftDeletedTodos = catchAsync(async (req, res) => {
  const id: any = req.params.id;
  const result = await TodoServices.getSoftDeletedTodos(id);
  sendResponse(res, {
    stautsCode: httpStatus.OK,
    success: true,
    message: "Upcoming todos fetched successfully",
    data: result,
  });
});
//update todo's status
const updateTodoStatus = catchAsync(async (req, res) => {
  const id: any = req.params.id;
  const status: TtodoStatus = "complete";
  const result = await TodoServices.updateTodoStatus(id, status);
  sendResponse(res, {
    stautsCode: httpStatus.OK,
    success: true,
    message: "status updated successfully",
    data: result,
  });
});
//soft deletion of a todo
const softDeletionOfTodo = catchAsync(async (req, res) => {
  const id: any = req.params.id;
  const result = await TodoServices.todoSoftDeletion(id);
  sendResponse(res, {
    stautsCode: httpStatus.OK,
    success: true,
    message: "status updated successfully",
    data: result,
  });
});
//permanent deletion of a todo
const permanetDeletionOfTodo = catchAsync(async (req, res) => {
  const id: any = req.params.id;
  const result = await TodoServices.todoPermanentDeletion(id);
  sendResponse(res, {
    stautsCode: httpStatus.OK,
    success: true,
    message: "status updated successfully",
    data: result,
  });
});

export const TodoControllers = {
  addNewTodo,
  getUserTodos,
  getUserIncompletedTodos,
  getUserCompletedTodos,
  updateTodoStatus,
  softDeletionOfTodo,
  permanetDeletionOfTodo,
  getSoftDeletedTodos,
};
