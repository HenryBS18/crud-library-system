import express from 'express';
import { deleteUserByID, getUserByID, getUserByEmail, getUsers, updateUser } from '../controllers/UserController.js';

const UserRoute = express.Router();

UserRoute.get('/users', getUsers);
UserRoute.get('/users/:id', getUserByID);
UserRoute.get('/users/email/:email', getUserByEmail);
UserRoute.patch('/users', updateUser);
UserRoute.delete('/users/:id', deleteUserByID);

export default UserRoute;