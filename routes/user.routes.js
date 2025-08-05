import { registerUser, loginUser,logoutUser,deleteUserAccount, sendOtpController, verifyOtpController, createAddress, deleteAddress,forgotPassword } from '../controllers/user.controller.js';
import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', authenticate,logoutUser)
userRouter.delete('/delete-account', authenticate, deleteUserAccount);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/send-otp', sendOtpController);
userRouter.post('/verify-otp', verifyOtpController);
userRouter.put('/address', authenticate, createAddress);
userRouter.delete('/delete-address', authenticate, deleteAddress);

export default userRouter;
