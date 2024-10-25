import express from "express";
import {sequelize} from "./data/index.js";
import {errorHandler} from './error/index.js';
import userRoute from './routes/user.js';
import postRouter from './routes/post.js';

const app = express();
const port = 3000;

await sequelize.sync({ force: true });
app.use(express.json());
app.use('/api',userRoute);
app.use('/api',postRouter);



app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(errorHandler);
app.use(express.json());