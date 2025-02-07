import express from "express";
import { authorize } from "../../DAL/middlewares/auth.middleware";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post("/fake", authorize, PaymentController.createPayment);
router.get("/status/:transactionId", PaymentController.getPaymentStatus);


export default router;
