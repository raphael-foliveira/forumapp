import express from 'express';
import multer from 'multer';
import { verifyToken, authenticated } from '../middleware/auth.middleware';
import { subforumController } from '../controllers';

const upload = multer({ dest: './static/subforums' });

const subForumRouter = express.Router();

subForumRouter
  .route('/')
  .get(subforumController.getSubForumsHandler)
  .post(
    verifyToken,
    upload.single('image'),
    authenticated(subforumController.createSubForumHandler),
  );

subForumRouter.get('/:name', subforumController.getSubForumHandler);

subForumRouter.put(
  '/:id',
  authenticated(subforumController.updateSubForumHandler),
);

subForumRouter.delete(
  '/:id/:memberid',
  authenticated(subforumController.deleteMemberHandler),
);

export default subForumRouter;
