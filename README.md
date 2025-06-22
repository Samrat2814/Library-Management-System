📚 Library Management API

Then, give a brief explanation:

This project is a backend RESTful API built using Express.js, TypeScript, and MongoDB (via Mongoose). It helps manage a library system — adding books, borrowing books, tracking availability, and generating a summary of borrowed items.

Explain what the project aims to achieve:

Manage book records in a library

Handle borrow operations with stock control

Summarize total borrow activity

🔧 Technologies Used
List the tech stack:

Express.js – Web server framework

TypeScript – Type safety and cleaner code

MongoDB + Mongoose – Database and ORM

Dotenv – For environment variables

CORS & Middleware – For security and clean architecture

📁 Project Structure Explanation
Explain your modular folder structure like this:

src/modules/books: All files related to book feature

model: defines how a book looks

service: contains business logic (create, update, etc.)

controller: handles request/response

route: maps URLs to controllers

src/modules/borrow: Everything related to borrow logic

Includes Mongoose middleware & aggregation

src/utils/sendResponse.ts: A helper to keep all API responses consistent

src/middlewares/errorHandler.ts: Handles all errors in a clean, formatted way

src/config/database.ts: MongoDB connection setup

src/app.ts: Main Express app config

src/server.ts: Entry point to run the server

🚀 Features Description
Explain what your API can do:

Create a Book
Adds a new book to the library. Validates input like title, author, genre, and copies.

View All Books
Supports filtering by genre, sorting by field, and limiting results (e.g., for pagination).

View Single Book
Retrieves details of one book by its ID.

Update Book
Can update fields like the number of copies.

Delete Book
Removes a book permanently.

Borrow a Book

Checks if the book exists and has enough copies.

Deducts the borrowed quantity.

If no copies left, marks the book as unavailable.

Uses Mongoose middleware and instance methods for this logic.

Get Borrow Summary

Returns a report using MongoDB’s aggregation pipeline.

Shows total quantity borrowed per book.

Joins with book details like title and ISBN.

📦 Error Handling
Explain that your project uses global error handling, so:

Validation errors

Not found errors

Server errors
…are returned in a standard JSON format with a clear message.

🧠 Concepts Demonstrated
List the core concepts required in your assignment:

Mongoose Schema Validation

Business Logic Enforcement (e.g., copies checking)

Instance Method on Book model to update availability

Post Middleware to update book copies after borrowing

Aggregation Pipeline to generate summary report

RESTful API with Clean Code Architecture (Controller → Service → Model)

📩 API Behavior and Response Format
Briefly mention that:

All responses use a consistent structure: success, message, and data

Errors include a success: false, a message, and an error object

🧪 Testing the API
Tell the user:

You can use Postman or Thunder Client to test the endpoints.

You must create a book first before borrowing it.

You should use the correct book ID when posting a borrow.
