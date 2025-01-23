import express from 'express';
import { userRouter } from '../Core/user/user.routes';
import { bookRouter } from '../Core/book/book.routes';

export const appRouter = express.Router()

appRouter.use('/user',userRouter)
appRouter.use('/book',bookRouter)