
import mongoose from 'mongoose';
import Book from '../books/book.model';
import { Borrow } from './borrow.model';


export const createBorrow = async (payload: {
  book: string;
  quantity: number;
  dueDate: Date;
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const book = await Book.findById(payload.book).session(session);
    if (!book) throw new Error('Book not found');

    if (book.copies < payload.quantity) {
      throw new Error('Not enough copies available');
    }

    const borrow = await Borrow.create([payload], { session });
    await session.commitTransaction();
    return borrow[0];
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export const getBorrowSummary = async () => {
  return Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'bookDetails',
      },
    },
    {
      $unwind: '$bookDetails',
    },
    {
      $project: {
        _id: 0,
        book: {
          title: '$bookDetails.title',
          isbn: '$bookDetails.isbn',
        },
        totalQuantity: 1,
      },
    },
  ]);
};
