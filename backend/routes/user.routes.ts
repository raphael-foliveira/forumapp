import express from 'express';
import multer from 'multer';
import { userController } from '../controllers';

const upload = multer({ dest: './static/users' });

const usersRouter = express.Router();

usersRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(upload.single('profilePicture'), userController.createUser);

usersRouter.get('/:userId', userController.getUser);

export default usersRouter;
