import express from 'express';
const app = express();
import cors from 'cors';
import routerUser from './routers/user.router.js';
import routerAuth from './routers/auth.router.js';
import routerTopic from './routers/topic.router.js';
import routerQuestion from './routers/question.router.js';
import routerResult from './routers/result.router.js';

app.use(express.json());
app.use(cors());
app.use('/api/users', routerUser);
app.use('/api/auth', routerAuth);
app.use('/api/topics', routerTopic);
app.use('/api/questions', routerQuestion);
app.use('/api/results', routerResult);


export default app;