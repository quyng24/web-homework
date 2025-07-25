import express from 'express';
const routerUser = express.Router();
import validateObjectId from '../middleware/validateObjectId.js';
import {getUsers, createUser, getUserById, deleteUser, updateUser} from '../controllers/user.controller.js';

routerUser.get('/', getUsers);
routerUser.post('/', createUser);
routerUser.get('/:id', validateObjectId(), getUserById);
routerUser.delete("/:id", validateObjectId(), deleteUser);
routerUser.put("/:id", validateObjectId(), updateUser);


export default routerUser;