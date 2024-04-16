import express from 'express';
import multer from 'multer';
import { userController } from '../controllers';
import { useHandler } from './use-handler';

const upload = multer({ dest: './static/users' });

const usersRouter = express.Router();

usersRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(upload.single('profilePicture'), useHandler(userController.createUser));

usersRouter.get('/:userId', useHandler(userController.getUser));

export default usersRouter;
