import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/', userRoutes);

app.get('/', (req, res) => {
  res.send('hey !');
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
