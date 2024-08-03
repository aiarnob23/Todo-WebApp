import { todoInstance } from "./getAxiosBaseUrl";


export const softDeleteTodo = async (id) => {
  const res = await todoInstance.patch(`todo/soft-deletion/${id}`);
  if (res.data.success) {
    window.location.reload();
  } else {
    alert("something went wrong!");
  }
};

export const permanetDeleteTodo = async (id) => {
  const res = await todoInstance.delete(`todo/permanent-delete/${id}`);
  if (res.data.success) {
    window.location.reload();
  } else {
    alert("something went wrong!");
  }
};
