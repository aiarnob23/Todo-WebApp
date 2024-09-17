import axios from "axios";
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

export const todoInstance = axios.create({
  baseURL: "https://todo-web-backend-lyart.vercel.app/api/",
  headers: {
    Authorization: `${token}`,
    user: `${user}`,
  },
});
