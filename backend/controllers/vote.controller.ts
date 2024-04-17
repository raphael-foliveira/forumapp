import { RequestHandler } from 'express';
import { voteRepository } from '../entities/vote.entity';
import { HttpError } from '../middleware/error-handling.middleware';
import { AuthenticatedRequestHandler } from '../types/request';

export const getVotes: RequestHandler = async ({ query }, res) => {
  const votes = await voteRepository.find({
    where: {
      user: {
        id: query.userId as string,
      },
      post: {
        id: query.postId as string,
      },
    },
    relations: ['user', 'post'],
  });
  return res.status(200).json(votes);
};

export const getVote: RequestHandler = async ({ params }, res) => {
  const vote = await voteRepository.findOne({
    where: {
      id: params.id,
    },
    relations: ['user', 'post'],
  });
  return res.status(200).json(vote);
};

export const deleteVote: AuthenticatedRequestHandler = async (
  { query },
  res,
) => {
  const vote = await voteRepository.findOne({
    where: {
      user: {
        id: query.userId as string,
      },
      post: {
        id: query.postId as string,
      },
    },
  });
  if (!vote) {
    throw new HttpError(404, 'Vote not found');
  }
  const result = await voteRepository.delete(vote);
  return res.status(200).json(result);
};

export const upsertVote: AuthenticatedRequestHandler = async (
  { query, body },
  res,
) => {
  const selectedVote = await voteRepository.findOne({
    where: {
      user: {
        id: query.userId as string,
      },
      post: {
        id: query.postId as string,
      },
    },
    relations: {
      post: true,
      user: true,
    },
  });

  if (selectedVote) {
    selectedVote.value = body.value as 1 | -1;
    const updatedVote = await voteRepository.save(selectedVote);
    return res.status(200).json(updatedVote);
  }

  const newVote = voteRepository.create({
    user: {
      id: query.userId as string,
    },
    post: {
      id: query.postId as string,
    },
    value: body.value,
  });

  const result = await voteRepository.save(newVote);

  return res.status(200).json(result);
};
