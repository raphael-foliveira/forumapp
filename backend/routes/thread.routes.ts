import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/auth.middleware';
import { threadController } from '../controllers';

const upload = multer({ dest: './static/threads' });

const threadRouter = express.Router();

threadRouter
  .route('/')
  .get(threadController.getThreadsHandler)
  .post(
    verifyToken,
    upload.single('threadImage'),
    threadController.createThreadHandler,
  );

threadRouter.get('/:id', threadController.getThread);

export default threadRouter;
