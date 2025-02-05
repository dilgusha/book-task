import { Router } from "express";
import { BookController } from "./book.controller";
import { authorize } from "../../DAL/middlewares/auth.middleware";

export const bookRouter = Router();
const controller = BookController;

bookRouter.post("/create",  authorize,controller.createBook);