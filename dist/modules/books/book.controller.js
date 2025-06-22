"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const BookService = __importStar(require("./book.service"));
const sendResponse_1 = require("../../utils/sendResponse");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield BookService.createBook(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const books = yield BookService.getAllBooks({ genre: filter }, { sortBy, sort, limit });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield BookService.getBookById(req.params.bookId);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield BookService.updateBook(req.params.bookId, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: 'Book updated successfully',
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield BookService.deleteBook(req.params.bookId);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
