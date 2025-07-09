import { getAllUsers, createUser } from '../controllers/user.controller.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/users', getAllUsers);

userRouter.post('/users', createUser);

export default userRouter;
