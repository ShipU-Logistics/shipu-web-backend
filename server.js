import { config } from 'dotenv';
import express from 'express';
import userRouter from './routes/user.routes.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// router
app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('hey !');
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
