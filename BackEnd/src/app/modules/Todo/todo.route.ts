import express from "express";
import { TodoControllers } from "./todo.controller";
import validateRequest from "../../middlewares/validateRequest";
import { todoValidations } from "./todo.validation";
import { verifyToken } from "../../middlewares/auth";

const router = express.Router();

router.post("/",verifyToken,validateRequest(todoValidations.newTodoValidation),TodoControllers.addNewTodo);
router.get("/",verifyToken, TodoControllers.getUserTodos);
router.get(`/incomplete-todos/:id`,verifyToken, TodoControllers.getUserIncompletedTodos);
router.get(`/completed-todos/:id`,verifyToken, TodoControllers.getUserCompletedTodos);
router.get(`/trash/:id`,verifyToken, TodoControllers.getSoftDeletedTodos);
router.patch(`/update-status/:id`,verifyToken, TodoControllers.updateTodoStatus);
router.patch(`/soft-deletion/:id`,verifyToken, TodoControllers.softDeletionOfTodo);
router.delete(`/permanent-delete/:id`,verifyToken, TodoControllers.permanetDeletionOfTodo);

export const TodoRoutes = router;
