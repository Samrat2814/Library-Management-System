import { Schema, model } from 'mongoose';
import { IBorrow } from './borrow.book.interface';
import Book from '../books/book.model';



const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

borrowSchema.post('save', async function (doc) {
  const borrowedBook = await Book.findById(doc.book);
  if (borrowedBook) {
    borrowedBook.copies -= doc.quantity;
    borrowedBook.updateAvailability(); // instance method
    await borrowedBook.save();
  }
});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);
