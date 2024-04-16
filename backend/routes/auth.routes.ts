import express from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { authController } from '../controllers';
import { useHandler } from './use-handler';

const authRouter = express.Router();

authRouter.post(
  '/login',
  useHandler(verifyToken),
  useHandler(authController.logIn),
);
authRouter.post(
  '/logout',
  useHandler(verifyToken),
  useHandler(authController.logOut),
);
authRouter.post('/verify-token', authController.checkToken);

export default authRouter;
