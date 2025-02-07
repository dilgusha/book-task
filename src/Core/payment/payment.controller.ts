import { Response } from "express";
import { AuthRequest } from "../../types";
import { Order } from "../../DAL/entities/Order.entity";
import { Payment } from "../../DAL/entities/Payment.entity";
import { EPaymentStatus } from "../../shared/enum/payment.enum";
import { ESatus } from "../../shared/enum/order.enum";
import { PaymentDto } from "./payment.dto";
import { validate } from "class-validator";
import { formatErrors } from "../../utils/error.formatter";

const createPayment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const dto = new PaymentDto();
        dto.orderId = req.body.orderId;
        dto.amount = req.body.amount;
        dto.transactionId = `TXN-${Date.now()}`;

        const errors = await validate(dto);
        if (errors.length > 0) {
            res.status(400).json(formatErrors(errors));
            return;
        }

        const order = await Order.findOne({ where: { id: Number(dto.orderId) }, relations: ["user"] });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }

        const isSuccess = Math.random() > 0.2;
        const transactionId = `TXN-${Date.now()}`;

        const payment = new Payment();
        payment.user = order.user;
        payment.order = order;
        payment.amount = dto.amount;
        payment.transactionId = transactionId;
        payment.status = isSuccess ? EPaymentStatus.SUCCESS : EPaymentStatus.FAILED;

        await payment.save();

        if (isSuccess) {
            order.status = ESatus.PAID;
            await order.save();
        }

        res.status(201).json({
            message: isSuccess ? "Payment successful" : "Payment failed",
            transactionId,
            status: payment.status,
        });

    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getPaymentStatus = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { transactionId } = req.params;

        const payment = await Payment.findOne({ where: { transactionId } });
        if (!payment) {
            res.status(404).json({ message: "Payment not found" });
            return;
        }

        res.status(200).json({
            transactionId: payment.transactionId,
            status: payment.status,
        });

    } catch (error) {
        console.error("Error fetching payment status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const PaymentController = {
    createPayment,
    getPaymentStatus
};