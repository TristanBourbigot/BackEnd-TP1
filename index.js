import express from "express";
import {sequelize} from "./data/index.js";
import {errorHandler} from './error/index.js';
import userRoute from './routes/user.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api',userRoute)


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(errorHandler);
app.use(express.json());