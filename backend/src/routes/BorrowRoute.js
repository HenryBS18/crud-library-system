import express from 'express';
import { createBorrow, deleteBorrowByID, getBorrowByID, getBorrows, getAllBorrowsByUser, updateBorrow } from '../controllers/BorrowController.js';

const BorrowRoute = express.Router();

BorrowRoute.get('/borrows', getBorrows);
BorrowRoute.get('/borrows/:id', getBorrowByID);
BorrowRoute.get('/borrows/user/:id', getAllBorrowsByUser);
BorrowRoute.post('/borrows/add', createBorrow);
BorrowRoute.patch('/borrows/:id', updateBorrow);
BorrowRoute.delete('/borrows/:id', deleteBorrowByID);

export default BorrowRoute;