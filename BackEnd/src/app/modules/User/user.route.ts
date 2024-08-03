
import express from "express";
import { userControllers } from "./user.controller";


const router = express.Router();

router.get('/user-detail', userControllers.getUserData);
router.post('/create-user', userControllers.addNewUser);


export const UserRoutes =  router;