import express from 'express';
const app = express();
import routerUser from './routers/user.router.js';
import routerAuth from './routers/auth.router.js';
import cors from 'cors';

app.use(express.json());
app.use(cors());
app.use('/api/users', routerUser);
app.use('/api/auth', routerAuth);


export default app;