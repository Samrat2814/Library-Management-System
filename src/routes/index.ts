import express from 'express';
import { BookRoutes } from '../modules/books/book.route';
import { BorrowRoutes } from '../modules/borrow-books/borrow.route';



const router = express.Router();

router.use('/books', BookRoutes);
router.use('/borrow', BorrowRoutes);

export { router };
