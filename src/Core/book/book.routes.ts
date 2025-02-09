import { Router } from "express";
import { BookController } from "./book.controller";
import { authorize } from "../../DAL/middlewares/auth.middleware";

export const bookRouter = Router();

bookRouter.post("/create", authorize, BookController.createBook);
bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getBookById);
bookRouter.delete("/:id", authorize, BookController.deleteBook);
bookRouter.get("/search", BookController.searchBooks);
bookRouter.post("/rent", authorize, BookController.rentBook);
bookRouter.get("/popular", BookController.getPopularBooks);


// createBook,
//     getAllBooks,
//     getBookById,
//     deleteBook,
//     searchBooks,
//     rentBook,
//     rateBook,
//     getPopularBooks,