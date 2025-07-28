import express from 'express';
const routerResult = express.Router();
import {submitResult, getUserResults} from '../controllers/result.controller.js';

routerResult.post('/submit', submitResult);
routerResult.get('/user/:userId', getUserResults);

export default routerResult;