import express from 'express';
import { createBook, deleteBookByID, getBookByID, getBooks, updateBook } from '../controllers/BookController.js';

const BookRoute = express.Router();

BookRoute.get('/books', getBooks);
BookRoute.get('/books/:id', getBookByID);
BookRoute.post('/books/add', createBook);
BookRoute.patch('/books/:id', updateBook);
BookRoute.delete('/books/:id', deleteBookByID);

export default BookRoute;