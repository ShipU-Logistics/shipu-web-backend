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
<<<<<<< HEAD
app.use('/', userRoutes);
=======
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// router
app.use('/api', userRouter);
>>>>>>> f2ff2ba20788986c95fb20c0b53a58444818e35d

app.get('/', (req, res) => {
  res.send('hey !');
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
