import express from 'express';
const routerQuestion = express.Router();
import { getQuestionsByTopic, createQuestion, deleteQuestion, updateQuestion } from '../controllers/question.controller.js';

routerQuestion.get('/:topicId', getQuestionsByTopic);
routerQuestion.post('/', createQuestion);
routerQuestion.delete('/:id', deleteQuestion);
routerQuestion.put('/:id', updateQuestion);

export default routerQuestion;