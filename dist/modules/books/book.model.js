"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true, enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'] },
    isbn: { type: String, required: true, unique: true },
    description: { type: String, required: true, min: 0 },
    copies: { type: Number, required: true },
    available: { type: Boolean, default: true },
}, {
    timestamps: true,
});
// instance method
bookSchema.methods.updateAvailability = function () {
    console.log(this);
    this.available = this.copies > 0;
};
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
