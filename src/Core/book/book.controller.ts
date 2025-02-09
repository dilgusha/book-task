import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { Book } from "../../DAL/entities/Book.entity";
import { formatErrors } from "../../utils/error.formatter";
import { BookDto } from "./book.dto";
import { EUserRoles } from "../../shared/enum/user.enum";
import { AuthRequest } from "../../types";
import { Author } from "../../DAL/entities/Author.entity";
import { User } from "../../DAL/entities/User.entity";

const createBook = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user || req.user.role !== EUserRoles.ADMIN) {
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
             res.status(404).json({ message: "Book not found" });
             return
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteBook = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user || req.user.role !== EUserRoles.ADMIN) {
             res.status(403).json({ message: "Forbidden: Only admins can delete books" });
             return
        }
        const id = Number(req.params.id);
        const book = await Book.findOne({ where: { id } });
        if (!book) {
             res.status(404).json({ message: "Book not found" });
             return
        }
        await book.remove();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const searchBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, author, category, publishedAfter } = req.query;
        let filter: any = {};
        if (title) filter.title = { $regex: title, $options: 'i' };
        if (author) filter.author = { $regex: author, $options: 'i' };
        if (category) filter.category = category;
        if (typeof publishedAfter === "string") {
            const publishedDate = new Date(publishedAfter);
            if (!isNaN(publishedDate.getTime())) {
                filter.publishedDate = { $gt: publishedDate };
            }
        } const books = await Book.find(filter);
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const rentBook = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { userId, days } = req.body;
        const book = await Book.findOne({ where: { id: Number(id) } });
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return
        } 
        book.isRented = true;
        book.rentedBy = userId;
        book.rentExpiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        await book.save();
        res.status(200).json({ message: "Book rented successfully", book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const rateBook = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { userId, rating } = req.body;
        if (rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be between 1 and 5" });
        const book = await Book.findOne({ where: { id: Number(id) } });
        if (!book) return res.status(404).json({ message: "Book not found" });
        book.ratings.push({ userId, rating });
        book.averageRating = book.ratings.reduce((acc, curr) => acc + curr.rating, 0) / book.ratings.length;
        await book.save();
        res.status(200).json({ message: "Rating added successfully", book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getPopularBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await Book.find({ order: { readCount: "DESC" }, take: 10 });
        res.status(200).json(books);
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
    searchBooks,
    rentBook,
    rateBook,
    getPopularBooks,
};


