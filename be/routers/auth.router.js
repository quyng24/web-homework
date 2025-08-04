import express from 'express';
const routerAuth = express.Router();
import { register, login, tokenInfoUser, logout } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

routerAuth.post('/register', register);
routerAuth.post('/login', login);
routerAuth.get('/me', authMiddleware, tokenInfoUser);
routerAuth.post('/logout', logout);

export default routerAuth;