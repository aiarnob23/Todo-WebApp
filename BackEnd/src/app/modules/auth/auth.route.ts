
import express from "express";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post('/loginUser', authControllers.loginUserToken);

export const authRoutes = router;