import { NextFunction, Response } from "express";
import { AuthRequest } from "../../types";

const createOrder = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({ message: "Order created" });
    return
}

export const OrderController = {
    createOrder
};