import express from 'express';
import { authenticated } from '../middleware/auth.middleware';
import { voteController } from '../controllers';

const voteRouter = express.Router();

voteRouter.get('/', voteController.getVotesHandler);
voteRouter.get('/:id', voteController.getVoteHandler);
voteRouter.delete('/', authenticated(voteController.deleteVoteHandler));
voteRouter.put('/', authenticated(voteController.upsertVoteHandler));

export default voteRouter;
