import express from "express"
import {getAllUsers,createUser} from '../controllers/user.controller.js';

const router = express.router();

router.get('/users',getAllUsers);

router.Post('/users',createUser)

export default router;