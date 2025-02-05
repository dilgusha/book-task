import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { User } from '../entities/User.entity';
import { AppDataSource } from '../config/db';
import { AuthRequest } from '../../types';

const jwtSecret = process.env.JWT_SECRET || 'defaultSecretKey';

export const authorize = async (req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
    const authHeader = req.headers["authorization"]; 

    if (!authHeader) {
         res.status(403).json({ message: "Authorization required" });
         return
    }

    if (!authHeader.startsWith("Bearer ")) {
         res.status(403).json({ message: "Bearer token is required" });
         return
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
         res.status(403).json({ message: "Bearer token is required" });
         return
    }

    try {
        const decoded: any = jwt.verify(token, jwtSecret);
        const user = await User.findOne({ where: { id: decoded.sub } });

        if (!user) {
            res.status(401).json({ message: "User not found!" });
            return
        } 

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token not valid", error });
    }
};
