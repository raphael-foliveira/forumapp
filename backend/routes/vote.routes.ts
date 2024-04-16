import express from 'express';
import { authenticated } from '../middleware/auth.middleware';
import { voteController } from '../controllers';
import { useHandler } from './use-handler';

const voteRouter = express.Router();

voteRouter.get('/', useHandler(voteController.getVotes));
voteRouter.get('/:id', useHandler(voteController.getVote));
voteRouter.delete('/', useHandler(authenticated(voteController.deleteVote)));
voteRouter.put('/', useHandler(authenticated(voteController.upsertVote)));

export default voteRouter;
