import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/User.entity';
import { AppDataSource } from '../config/db';

const jwtSecret = process.env.JWT_SECRET || 'defaultSecretKey';

const userRepository = AppDataSource.getRepository(User);

const useAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.headers.authorization) {
        return next(res.status(401).json({
            message: "Token tapılmadı"
        }));
    }

    const authHeader = req.headers.authorization;

    if (!authHeader.startsWith("Bearer ")) {
        return next(res.status(403).json({
            message: "Bearer token tələb olunur"
        }));
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return next( res.status(403).json({
            message: 'Bearer token tələb olunur'
        }));
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { sub: string };

        const user = await userRepository.findOne({
            where: { id: +decoded.sub },
        });

        if (!user) {
            return next( res.status(401).json({
                message: "İstifadəçi tapılmadı!"
            }));
        }

        req.user = user; // Adjust to match the `IUser` interface


        next();
    } catch (error) {
        return next( res.status(401).json({
            message: "Etibarsız token",
            error: error instanceof Error ? error.message : error
        }));
    }
};

export default useAuth;