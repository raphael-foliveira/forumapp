import express from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { voteController } from '../controllers';

const voteRouter = express.Router();

voteRouter.get('/', voteController.getVotesHandler);
voteRouter.get('/:id', voteController.getVoteHandler);
voteRouter.delete('/', verifyToken, voteController.deleteVoteHandler);
voteRouter.put('/', verifyToken, voteController.upsertVoteHandler);

export default voteRouter;
