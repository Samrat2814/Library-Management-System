import { IBook } from "./book.interface";
import Book from "./book.model";


export const createBook = async (payload: Partial<IBook>) => {
  const newBook = new Book(payload);
  await newBook.save();
  return newBook;
};

export const getAllBooks = async (filter: any, options: any) => {
  const query: any = {};
  if (filter.genre) query.genre = filter.genre;

  const books = await Book.find(query)
    .sort({ [options.sortBy || 'createdAt']: options.sort === 'asc' ? 1 : -1 })
    .limit(options.limit ? Number(options.limit) : 10);

  return books;
};

export const getBookById = async (id: string) => {
  return Book.findById(id);
};

export const updateBook = async (id: string, updateData: Partial<IBook>) => {
  const book = await Book.findByIdAndUpdate(id, updateData, { new: true });
  return book;
};

export const deleteBook = async (id: string) => {
  await Book.findByIdAndDelete(id);
  return null;
};
