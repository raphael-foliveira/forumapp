import express from 'express';
import { authenticated } from '../middleware/auth.middleware';
import { postController } from '../controllers';

const postRouter = express.Router();

postRouter.get('/:id', postController.getPostHandler);
postRouter.post('/', authenticated(postController.createPostHandler));

export default postRouter;
