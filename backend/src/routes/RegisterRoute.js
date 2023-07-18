import express from 'express';
import { registerUser } from '../controllers/RegisterController.js';

const RegisterRoute = express.Router();

RegisterRoute.post('/register', registerUser);

export default RegisterRoute;