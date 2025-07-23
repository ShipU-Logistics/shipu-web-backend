import { config } from 'dotenv';
import express from 'express';
import userRouter from './routes/user.routes.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import shipmentsRouter from './routes/shipments.route.js';
config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
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
app.use('/api',shipmentsRouter);

app.get('/', (req, res) => {
  res.send('hey !');
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
