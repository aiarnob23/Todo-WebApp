import axios from "axios";

export const todoInstance = axios.create({
  baseURL: "https://todo-web-backend-lyart.vercel.app/api/",
  withCredentials: true,
});
