import { getAllUsers,registerUser, createUser ,verifyOtp} from '../controllers/user.controller.js';
import { Router } from 'express';

const userRouter = Router();


userRouter.post('/users', createUser);
userRouter.post('/register',registerUser);
userRouter.get('/all', getAllUsers );
userRouter.post('/verify',verifyOtp);

export default userRouter;
