import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { User } from "../../DAL/entities/User.entity";
import * as bcrypt from "bcryptjs";
import { formatErrors } from "../../utils/error.formatter";
import { LoginDto, RegisterDto } from "./user.dto";
import jwt from "jsonwebtoken";
import { appConfig } from "../../consts";

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return
    }

    const dto = new RegisterDto();
    dto.name = name;
    dto.email = email;
    dto.password = password;

    const errors = await validate(dto);
    if (errors.length > 0) {
      res.status(400).json(formatErrors(errors));
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
      name,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: savedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const dto = new LoginDto();
    dto.email = email;
    dto.password = password;

    const errors = await validate(dto);
    if (errors.length > 0) {
      res.status(400).json(formatErrors(errors));
      return;
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const payload = {
      sub: user.id
    }
    const jwt_secret = appConfig.JWT_SECRET

    const token = jwt.sign(payload, jwt_secret, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserPurchasedBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: Number(id) }, relations: ["purchasedBooks"] });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return
    }
    res.status(200).json(user.purchasedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const UserController = {
  register,
  login,
  getUserPurchasedBooks
};
