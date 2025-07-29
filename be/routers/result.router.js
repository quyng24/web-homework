import express from 'express';
const routerResult = express.Router();
import {submitResult, getLatestResultByUserAndTopic, getUserResults, getUserResultById} from '../controllers/result.controller.js';

routerResult.post('/submit', submitResult);
routerResult.get('/latest/:userId/:topicId', getLatestResultByUserAndTopic);
routerResult.get('/user/:userId', getUserResults);
routerResult.get('/result/:resultId', getUserResultById);

export default routerResult;