import { todoInstance } from "./getAxiosBaseUrl";


export const createNewUser = async (name, email) => {
  await todoInstance
    .post("user/create-user", {
      name,
      email,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
