import express from 'express';
import multer from 'multer';
import { userController } from '../controllers';

const upload = multer({ dest: './static/users' });

const usersRouter = express.Router();

usersRouter
  .route('/')
  .get(userController.getAllUsersHandler)
  .post(upload.single('profilePicture'), userController.createUserHandler);

usersRouter.get('/:userId', userController.getUserHandler);

export default usersRouter;
