import express from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { authController } from '../controllers';
import { useHandler, useHandlers } from './use-handler';

const authRouter = express.Router();

authRouter.post('/login', ...useHandlers(verifyToken, authController.logIn));
authRouter.post('/logout', ...useHandlers(verifyToken, authController.logOut));
authRouter.post('/verify-token', useHandler(authController.checkToken));

export default authRouter;
