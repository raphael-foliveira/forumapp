import express from 'express';
import { authenticated } from '../middleware/auth.middleware';
import { postController } from '../controllers';

const postRouter = express.Router();

postRouter.get('/:id', postController.getPost);
postRouter.post('/', authenticated(postController.createPost));

export default postRouter;
