import express from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { postController } from '../controllers';

const postRouter = express.Router();

postRouter.get('/:id', postController.getPostHandler);
postRouter.post('/', verifyToken, postController.createPostHandler);

export default postRouter;
