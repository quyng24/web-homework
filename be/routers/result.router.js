import express from 'express';
const routerResult = express.Router();
import {submitResult, getUserResults, getLatestResultByUserAndTopic} from '../controllers/result.controller.js';

routerResult.post('/submit', submitResult);
routerResult.get('/user/:userId', getUserResults);
routerResult.get('/latest/:userId/:topicId', getLatestResultByUserAndTopic);

export default routerResult;