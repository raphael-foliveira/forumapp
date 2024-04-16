import { Request, Response } from 'express';
import { voteRepository } from '../entities/vote.entity';
import { HttpError } from '../middleware/error-handling.middleware';

export const getVotesHandler = async (req: Request, res: Response) => {
  const votes = await voteRepository.find({
    where: {
      user: {
        id: req.query.userId as string,
      },
      post: {
        id: req.query.postId as string,
      },
    },
    relations: ['user', 'post'],
  });
  return res.status(200).json(votes);
};

export const getVoteHandler = async (req: Request, res: Response) => {
  const vote = await voteRepository.findOne({
    where: {
      id: req.params.id,
    },
    relations: ['user', 'post'],
  });
  return res.status(200).json(vote);
};

export const deleteVoteHandler = async (req: Request, res: Response) => {
  const vote = await voteRepository.findOne({
    where: {
      user: {
        id: req.query.userId as string,
      },
      post: {
        id: req.query.postId as string,
      },
    },
  });
  if (!vote) {
    throw new HttpError(404, 'Vote not found');
  }
  const result = await voteRepository.delete(vote);
  return res.status(200).json(result);
};

export const upsertVoteHandler = async (req: Request, res: Response) => {
  const selectedVote = await voteRepository.findOne({
    where: {
      user: {
        id: req.query.userId as string,
      },
      post: {
        id: req.query.postId as string,
      },
    },
    relations: {
      post: true,
      user: true,
    },
  });

  if (selectedVote) {
    selectedVote.value = req.body.value as 1 | -1;
    const updatedVote = await voteRepository.save(selectedVote);
    return res.status(200).json(updatedVote);
  }

  const newVote = voteRepository.create({
    user: {
      id: req.query.userId as string,
    },
    post: {
      id: req.query.postId as string,
    },
    value: req.body.value,
  });
  const result = await voteRepository.save(newVote);

  return res.status(200).json(result);
};
