import { getAllUsers, createUser, registerUser } from '../controllers/user.controller.js';
import { Router } from 'express';

const router = express.Router();

const userRouter = Router();

userRouter.post('/users', createUser);
userRouter.post('users', registerUser)

userRouter.get('/users', getAllUsers);

export default userRouter;
