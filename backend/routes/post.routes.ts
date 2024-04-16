import express from 'express';
import { authenticated } from '../middleware/auth.middleware';
import { postController } from '../controllers';
import { useHandler } from './use-handler';

const postRouter = express.Router();

postRouter.get('/:id', useHandler(postController.getPost));
postRouter.post('/', useHandler(authenticated(postController.createPost)));

export default postRouter;
