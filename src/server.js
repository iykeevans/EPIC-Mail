import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';

// Set up the express app.
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use our routes.
app.use('/api/v1/', userRouter);

// Define our port number.
const port = process.env.PORT || 3000;

// Set up listening.
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});