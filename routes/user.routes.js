import { getAllUsers,registerUser, createUser ,verifyOtp,loginUser,logoutUser,forgetPassword} from '../controllers/user.controller.js';
import { Router } from 'express';

const userRouter = Router();


userRouter.post('/users', createUser);
userRouter.post('/register',registerUser);
userRouter.get('/all', getAllUsers );
userRouter.post('/verify',verifyOtp);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/forget-password', forgetPassword);

export default userRouter;
