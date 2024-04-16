import { Request, Response } from 'express';
import Post, { postRepository } from '../entities/post.entity';
import { voteRepository } from '../entities/vote.entity';
import { HttpError } from '../middleware/error-handling.middleware';
import { getUserFromRequest } from '../services/token.service';

export const createPostHandler = async (
  req: Request,
  res: Response,
): Promise<Post | void> => {
  const user = await getUserFromRequest(req);
  const newPostData = postRepository.create({
    author: user,
    parent: req.body.parent,
    content: req.body.content,
  });
  const newPost = await postRepository.save(newPostData);
  res.status(201).json(newPost);
};

export const getPostHandler = async (req: Request, res: Response) => {
  const post = await postRepository.findOne({
    where: {
      id: req.params.id,
    },
    relations: ['children', 'parent', 'author', 'votes'],
  });
  if (!post) {
    throw new HttpError(404, 'Post not found');
  }

  res.status(200).json(post);
};

export const getPostVotesHandler = async (req: Request, res: Response) => {
  const votes = await voteRepository.find({
    where: {
      post: {
        id: req.params.id,
      },
    },
    relations: ['user', 'post'],
  });

  res.status(200).json(votes);
};
