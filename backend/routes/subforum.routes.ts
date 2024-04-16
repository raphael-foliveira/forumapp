import express from 'express';
import multer from 'multer';
import { verifyToken, authenticated } from '../middleware/auth.middleware';
import { subforumController } from '../controllers';
import { useHandler } from './use-handler';

const upload = multer({ dest: './static/subforums' });

const subForumRouter = express.Router();

subForumRouter
  .route('/')
  .get(subforumController.getSubForums)
  .post(
    useHandler(verifyToken),
    useHandler(upload.single('image')),
    useHandler(authenticated(subforumController.createSubForum)),
  );

subForumRouter.get('/:name', useHandler(subforumController.getSubForum));

subForumRouter.put(
  '/:id',
  useHandler(authenticated(subforumController.updateSubForum)),
);

subForumRouter.delete(
  '/:id/:memberid',
  useHandler(authenticated(subforumController.deleteMember)),
);

export default subForumRouter;
