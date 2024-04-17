import { RequestHandler, Response } from 'express';
import Post, { postRepository } from '../entities/post.entity';
import { voteRepository } from '../entities/vote.entity';
import { HttpError } from '../middleware/error-handling.middleware';
import { AuthenticatedRequestHandler } from '../types/request';

export const createPost: AuthenticatedRequestHandler = async (
  { body },
  res,
  user,
): Promise<Response<Post | void>> => {
  const newPost = await postRepository.save({
    author: user,
    parent: body.parent,
    content: body.content,
  });
  return res.status(201).json(newPost);
};

export const getPost: RequestHandler = async ({ params }, res) => {
  const post = await postRepository.findOne({
    where: {
      id: params.id,
    },
    relations: ['children', 'parent', 'author', 'votes'],
  });
  if (!post) {
    throw new HttpError(404, 'Post not found');
  }

  return res.status(200).json(post);
};

export const getPostVotes: RequestHandler = async ({ params }, res) => {
  const votes = await voteRepository.find({
    where: {
      post: {
        id: params.id,
      },
    },
    relations: ['user', 'post'],
  });

  return res.status(200).json(votes);
};
