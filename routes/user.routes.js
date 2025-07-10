import { getAllUsers, createUser } from '../controllers/user.controller.js';
import { Router } from 'express';

const router = express.Router();


router.post('/users', createUser);
router.post('/users',registerUser);
router.get('/users', getAllUsers );


export default userRouter;
