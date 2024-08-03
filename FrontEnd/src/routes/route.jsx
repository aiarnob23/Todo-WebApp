import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import IncompleteTodo from "../pages/IncompletedTodo";
import CompletedTodo from "../pages/CompletedTodo";
import Trash from "../pages/Trash";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "incomplete-todos",
        element: <IncompleteTodo />,
      },
      {
        path: "completed-todos",
        element: <CompletedTodo />,
      },
      {
        path: "trash",
        element: <Trash />,
      },
    ],
  },
]);

export default router;
