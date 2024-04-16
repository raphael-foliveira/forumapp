import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/auth.middleware';
import { threadController } from '../controllers';
import { useHandler, useHandlers } from './use-handler';

const upload = multer({ dest: './static/threads' });

const threadRouter = express.Router();

threadRouter
  .route('/')
  .get(threadController.getThreads)
  .post(
    ...useHandlers(
      verifyToken,
      upload.single('threadImage'),
      threadController.createThread,
    ),
  );

threadRouter.get('/:id', useHandler(threadController.getThread));

export default threadRouter;
