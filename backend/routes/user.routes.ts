import express from 'express';
import multer from 'multer';
import { userController } from '../controllers';
import { useHandler, useHandlers } from './use-handler';

const upload = multer({ dest: './static/users' });

const usersRouter = express.Router();

usersRouter
  .route('/')
  .get(useHandler(userController.getAllUsers))
  .post(
    useHandlers(upload.single('profilePicture'), userController.createUser),
  );

usersRouter.get('/:userId', useHandler(userController.getUser));

export default usersRouter;
