import { Router } from "express";
import { UserController } from "./user.controller";

export const userRouter = Router();

userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)


