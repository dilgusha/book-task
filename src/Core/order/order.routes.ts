import { Router } from "express";
import { authorize } from "../../DAL/middlewares/auth.middleware";
import { OrderController } from "./order.controller";

export const orderRouter = Router();

orderRouter.post("/create",  authorize,OrderController.createOrder);