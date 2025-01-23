import { Router } from "express";
import { BookController } from "./book.controller";
import useAuth from "../../DAL/middlewares/auth.middleware";

export const bookRouter = Router();
const controller = BookController();

bookRouter.post("/create", 
    // useAuth,
    controller.create);