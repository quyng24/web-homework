import express from 'express';
const routerAuth = express.Router();
import { register, login } from '../controllers/auth.controller.js';

routerAuth.post('/login', login);
routerAuth.post('/register', register);

export default routerAuth;