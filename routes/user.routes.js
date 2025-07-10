import express from 'express';
import { getAllUsers, createUser } from '../controllers/user.controller.js';

const router = express.Router();


router.post('/users', createUser);
router.post('/users',registerUser);
router.get('/users', getAllUsers );


export default router;
