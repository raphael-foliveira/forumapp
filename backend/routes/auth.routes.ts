import express from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { authController } from '../controllers';

const authRouter = express.Router();

authRouter.post('/login', verifyToken, authController.logIn);
authRouter.post('/logout', verifyToken, authController.logOut);
authRouter.post('/verify-token', authController.checkToken);

export default authRouter;
