import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { User } from "../../DAL/entities/User.entity";

const Register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newUser = User.create({
      name,
    });

    const errors = await validate(newUser);

    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        })),
      });
    } else {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UserController = () => ({
  Register,
});