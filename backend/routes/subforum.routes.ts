import express from 'express';
import multer from 'multer';
import { verifyToken, authenticated } from '../middleware/auth.middleware';
import { subforumController } from '../controllers';

const upload = multer({ dest: './static/subforums' });

const subForumRouter = express.Router();

subForumRouter
  .route('/')
  .get(subforumController.getSubForums)
  .post(
    verifyToken,
    upload.single('image'),
    authenticated(subforumController.createSubForum),
  );

subForumRouter.get('/:name', subforumController.getSubForum);

subForumRouter.put('/:id', authenticated(subforumController.updateSubForum));

subForumRouter.delete(
  '/:id/:memberid',
  authenticated(subforumController.deleteMember),
);

export default subForumRouter;
