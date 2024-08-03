import { Ttodo, TtodoStatus } from "./todo.interface";
import { Todo } from "./todo.model";

//add new todo to the db
const addNewTodo = async (newTodo: Ttodo) => {
  const result = await Todo.create(newTodo);
  return result;
};
//get todos by user id and selected date
const getTodosByIdAndDate = async (id: string, date: string) => {
  const result = await Todo.find({
    date: date,
    user: id,
    status: "incomplete",
    isDeleted: false,
  });
  console.log(result);
  return result;
};
//update a todo's status
const updateTodoStatus = async (id: string, status: TtodoStatus) => {
  const result = await Todo.findByIdAndUpdate(
    id,
    { status: status },
    { new: true }
  );
  return result;
};
//soft deletion of a todo
const todoSoftDeletion = async (id: string) => {
  const result = await Todo.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};
//permanent deletion of a todo
const todoPermanentDeletion = async (id: string) => {
  const result = await Todo.findByIdAndDelete(id);
  return result;
};
//get users incompleted todos
const getIncompletedTodos = async (id: string) => {
  const result = await Todo.find({
    user: id,
    status: "incomplete",
    isDeleted: false,
  }).sort({ date: 1 });
  return result;
  console.log(result);
};
//get users completed todos
const getCompletedTodos = async (id: string) => {
  const result = await Todo.find({
    user: id,
    status: "complete",
    isDeleted: false,
  }).sort({ date: -1 });
  return result;
};
//get users softDeleted(trash) todos
const getSoftDeletedTodos = async (id: string) => {
  const result = await Todo.find({
    user: id,
    isDeleted: true,
  }).sort({ date: -1 });
  return result;
};

export const TodoServices = {
  addNewTodo,
  getTodosByIdAndDate,
  updateTodoStatus,
  todoSoftDeletion,
  todoPermanentDeletion,
  getIncompletedTodos,
  getCompletedTodos,
  getSoftDeletedTodos,
};
