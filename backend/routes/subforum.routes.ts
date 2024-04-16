import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/auth.middleware';
import { subforumController } from '../controllers';

const upload = multer({ dest: './static/subforums' });

const subForumRouter = express.Router();

subForumRouter
  .route('/')
  .get(subforumController.getSubForumsHandler)
  .post(
    verifyToken,
    upload.single('image'),
    subforumController.createSubForumHandler,
  );

subForumRouter.get('/:name', subforumController.getSubForumHandler);

subForumRouter.put(
  '/:id',
  verifyToken,
  subforumController.updateSubForumHandler,
);

subForumRouter.delete(
  '/:id/:memberid',
  verifyToken,
  subforumController.deleteMemberHandler,
);

export default subForumRouter;
