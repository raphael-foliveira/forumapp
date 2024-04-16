import { Request, Response } from 'express';
import { voteRepository } from '../entities/vote.entity';
import { AuthenticatingRequest } from '../middleware/auth.middleware';

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
  res.status(200).json(votes);
};

export const getVoteHandler = async (req: Request, res: Response) => {
  const vote = await voteRepository.findOne({
    where: {
      id: req.params.id,
    },
    relations: ['user', 'post'],
  });
  res.status(200).json(vote);
};

export const deleteVoteHandler = async (
  req: AuthenticatingRequest,
  res: Response,
) => {
  if (!req.user) {
    console.log('Unauthenticated request');
    res.sendStatus(403);
    return;
  }
  if (!req.query.userId || !req.query.postId) {
    console.log('Couldnt find vote');
    res.sendStatus(400);
    return;
  }
  console.log(req.query);
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
    console.log('Vote deletion failed.');
    res.sendStatus(500);
    return;
  }
  console.log('Deleting vote');
  console.log(vote);
  const result = await voteRepository.delete(vote);
  res.status(200).json(result);
};

export const upsertVoteHandler = async (
  req: AuthenticatingRequest,
  res: Response,
) => {
  if (!req.user) {
    console.log('Unauthenticated request');
    res.sendStatus(403);
    return;
  }
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
    console.log('Vote found');

    selectedVote.value = req.body.value as 1 | -1;
    const updatedVote = await voteRepository.save(selectedVote);
    console.log(selectedVote);
    res.status(200).json(updatedVote);
    return;
  }
  console.log('Vote not found. Creating...');

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
  console.log(result);

  res.status(200).json(result);
};
