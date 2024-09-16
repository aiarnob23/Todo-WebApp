import express, { Application, Request, Response } from "express";
import cors from "cors";
import { TodoRoutes } from "./app/modules/Todo/todo.route";
import notFound from "./app/middlewares/notFound";
import { UserRoutes } from "./app/modules/User/user.route";
import { authRoutes } from "./app/modules/auth/auth.route";
import cookieParser from "cookie-parser";


const app: Application = express();
app.use(cookieParser());
app.use(express.json());
// Use the cors middleware
app.use(
  cors({
    //origin: "https://todo-webapp-3e29e.web.app",
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);


app.use("/api/todo", TodoRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Todo Web App server is running... ... ...");
});

app.use(notFound);

export default app;
