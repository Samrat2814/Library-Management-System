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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = new book_model_1.default(payload);
    yield newBook.save();
    return newBook;
});
exports.createBook = createBook;
const getAllBooks = (filter, options) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (filter.genre)
        query.genre = filter.genre;
    const books = yield book_model_1.default.find(query)
        .sort({ [options.sortBy || 'createdAt']: options.sort === 'asc' ? 1 : -1 })
        .limit(options.limit ? Number(options.limit) : 10);
    return books;
});
exports.getAllBooks = getAllBooks;
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return book_model_1.default.findById(id);
});
exports.getBookById = getBookById;
const updateBook = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
    return book;
});
exports.updateBook = updateBook;
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_model_1.default.findByIdAndDelete(id);
    return null;
});
exports.deleteBook = deleteBook;
