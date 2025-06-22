"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.createBorrow = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("../books/book.model"));
const borrow_model_1 = require("./borrow.model");
const createBorrow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const book = yield book_model_1.default.findById(payload.book).session(session);
        if (!book)
            throw new Error('Book not found');
        if (book.copies < payload.quantity) {
            throw new Error('Not enough copies available');
        }
        const borrow = yield borrow_model_1.Borrow.create([payload], { session });
        yield session.commitTransaction();
        return borrow[0];
    }
    catch (err) {
        yield session.abortTransaction();
        throw err;
    }
    finally {
        session.endSession();
    }
});
exports.createBorrow = createBorrow;
const getBorrowSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    return borrow_model_1.Borrow.aggregate([
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
});
exports.getBorrowSummary = getBorrowSummary;
