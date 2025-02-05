import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { Book } from "../../DAL/entities/Book.entity";
import { formatErrors } from "../../utils/error.formatter";
import { BookDto } from "./book.dto";
import { UserRoles } from "../../shared/enum/user.enum";
import { AuthRequest } from "../../types";
import { Author } from "../../DAL/entities/Author.entites";

const createBook = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user || req.user.role !== UserRoles.ADMIN) {
            res.status(403).json({ message: "Forbidden: Only admins can create books" });
            return
        }
        const { title, price, stock, authorIds } = req.body;
        const dto = new BookDto();
        dto.title = title;
        dto.price = price;
        dto.stock = stock;
        dto.authorIds = authorIds;


        const errors = await validate(dto);
        if (errors.length > 0) {
            res.status(400).json(formatErrors(errors));
            return
        }

        const foundAuthors = await Author.find({ where: { id: authorIds } });
        if (foundAuthors.length !== authorIds.length) {
            res.status(404).json({ message: "One or more authors not found" });
            return
        }
        const newBook = Book.create({ title, price, stock, soldCount: 0, authors: foundAuthors });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const book = await Book.findOne({ where: { id } });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteBook = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user || req.user.role !== UserRoles.ADMIN) {
            return res.status(403).json({ message: "Forbidden: Only admins can delete books" });
        }
        const id = Number(req.params.id);
        const book = await Book.findOne({ where: { id } });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        await book.remove();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const BookController = {
    createBook,
    getAllBooks,
    getBookById,
    deleteBook,
};


