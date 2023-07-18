import express from 'express';
import { loginUser } from '../controllers/LoginController.js';

const LoginRoute = express.Router();

LoginRoute.post('/login', loginUser);

export default LoginRoute;