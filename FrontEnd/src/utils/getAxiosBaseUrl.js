import axios from "axios";

export const todoInstance = axios.create({
  baseURL: "http://localhost:4000/api/",
  withCredentials: true,
});
