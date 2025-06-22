import { Request, Response, NextFunction } from 'express';
import * as BookService from './book.service';
import { sendResponse } from '../../utils/sendResponse';


export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BookService.createBook(req.body);
    sendResponse(res, {
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;
    const books = await BookService.getAllBooks({ genre: filter }, { sortBy, sort, limit });
    sendResponse(res, {
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BookService.getBookById(req.params.bookId);
    sendResponse(res, {
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BookService.updateBook(req.params.bookId, req.body);
    sendResponse(res, {
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await BookService.deleteBook(req.params.bookId);
    sendResponse(res, {
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
