import axios from "axios";
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

export const todoInstance = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: {
    Authorization: `${token}`,
    user:`${user}`,
  },
});
