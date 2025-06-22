import { Types } from "mongoose";
import { IBook } from "../books/book.interface";

export interface IBorrow  {
  book: Types.ObjectId | IBook;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}