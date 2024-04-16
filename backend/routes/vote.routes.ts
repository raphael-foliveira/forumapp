import express from 'express';
import { authenticated } from '../middleware/auth.middleware';
import { voteController } from '../controllers';

const voteRouter = express.Router();

voteRouter.get('/', voteController.getVotes);
voteRouter.get('/:id', voteController.getVote);
voteRouter.delete('/', authenticated(voteController.deleteVote));
voteRouter.put('/', authenticated(voteController.upsertVote));

export default voteRouter;
