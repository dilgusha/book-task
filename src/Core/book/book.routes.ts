import { Router } from "express";
import { BookController } from "./book.controller";
import { authorize } from "../../DAL/middlewares/auth.middleware";

export const bookRouter = Router();

bookRouter.post("/create",  authorize ,BookController.createBook);