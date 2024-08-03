import { todoInstance } from "./getAxiosBaseUrl";


export const updateTodoStatus = async (id) => {
  const res = await todoInstance.patch(`todo/update-status/${id}`);
  if (res.data.success) {
    window.location.reload();
  }
};
