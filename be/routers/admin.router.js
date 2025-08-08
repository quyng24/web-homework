import express from "express";
const routerAdmin = express.Router();
import { getTopicStatistics } from '../controllers/admin.controller.js';

routerAdmin.get("/topic-statistics", getTopicStatistics);

export default routerAdmin;