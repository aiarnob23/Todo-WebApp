import { todoInstance } from "./getAxiosBaseUrl";
import { getUserId } from "./getUserDetails";



//insert new todo
export const addNewTodo = async (
  email,
  title,
  description,
  date
) => {
  const userId = await getUserId(email);
  const res = await todoInstance.post("todo", {
    title: title,
    user: userId,
    description: description,
    date: date,
  });
  if (res.data.success) {
    return date;
  } else {
    alert("something went wrong!");
  }
};
