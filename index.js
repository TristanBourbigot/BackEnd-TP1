import express from "express";
import { sequelize } from "./data/index.js";
import { errorHandler } from './error/index.js';
import userRoute from './routes/user.js';
import postRouter from './routes/post.js';
import channelRouter from './routes/channels.js';
import messageRouter from './routes/messages.js';
import {authExpress} from "./auth/index.js";
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors());
const portApi = 3000;


// await sequelize.sync({ force: true });
app.use(express.json());
app.use('/api', userRoute);
app.use('/api', authExpress, postRouter);
app.use('/api', authExpress, channelRouter);
app.use('/api', authExpress, messageRouter);

app.use(errorHandler);


app.listen(portApi, () => {
  console.log(`API app listening on port ${portApi}`);
});