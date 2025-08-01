import { registerUser, loginUser, sendOtpController, verifyOtpController, createAddress } from '../controllers/user.controller.js';
import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/send-otp', sendOtpController);
userRouter.post('/verify-otp', verifyOtpController);
userRouter.put('/address', authenticate, createAddress);

export default userRouter;
