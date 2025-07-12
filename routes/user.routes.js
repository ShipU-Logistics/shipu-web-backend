import { getAllUsers,registerUser, createUser ,} from '../controllers/user.controller.js';
import { Router } from 'express';

const userRouter = express.Router();


userRouter.post('/users', createUser);
userRouter.post('/users',registerUser);
userRouter.get('/users', getAllUsers );


export default userRouter;
