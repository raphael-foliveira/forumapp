import express from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { authController } from '../controllers';

const authRouter = express.Router();

authRouter.post('/login', authController.logInHandler);
authRouter.post('/logout', verifyToken, authController.logOutHandler);
authRouter.post('/verify-token', authController.checkToken);

export default authRouter;
