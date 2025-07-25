import express from 'express';
const routerTopic = express.Router();
import {getTopics, getTopicById, createTopic, deleteTopic, updateTopic} from '../controllers/topic.controller.js';

routerTopic.get('/', getTopics);
routerTopic.get('/:id', getTopicById);
routerTopic.post('/', createTopic);
routerTopic.delete('/:id', deleteTopic);
routerTopic.put('/:id', updateTopic);

export default routerTopic;