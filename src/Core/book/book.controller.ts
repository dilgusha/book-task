import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { User } from "../../DAL/entities/User.entity";
import { Book } from "../../DAL/entities/Book.entity";
import { formatErrors } from "../../utils/error.formatter";


const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, userId } = req.body;

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return next(res.status(404).json({ message: "User not found" }))
        }
        const newBook = Book.create({
            title, user 
        });
        const errors = await validate(newBook);
        if (errors.length > 0) {
            res.status(400).json(formatErrors(errors));
        } else {
            const savedBook = await newBook.save();
            res.status(201).json(savedBook);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await Book.find({ relations: ["user"],
            select:{
                id:true,
                title:true,
            }
         });
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const book = await Book.findOne({ where: { id }, relations: ["user"] });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const softDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const book = await Book.findOne({ where: { id }, relations: ["user"] });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        await book.softRemove();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const BookController = () => ({
    create, getAllBooks, getOne, softDelete
});