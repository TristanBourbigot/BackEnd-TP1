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
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const app = express();
app.use(cors());
const portApi = 3000;

// Load Swagger YAML
const swaggerDocument = YAML.load(path.join(process.cwd(), 'swagger.yaml'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoute);
app.use('/api', authExpress, postRouter);
app.use('/api', authExpress, channelRouter);
app.use('/api', authExpress, messageRouter);

// Error Handler
app.use(errorHandler);

app.listen(portApi, () => {
  console.log(`API app listening on port ${portApi}`);
  console.log(`Swagger docs available at http://localhost:${portApi}/api-docs`);
});
