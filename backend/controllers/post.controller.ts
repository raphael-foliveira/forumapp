import { Request, RequestHandler, Response } from 'express';
import Post, { postRepository } from '../entities/post.entity';
import { voteRepository } from '../entities/vote.entity';
import { HttpError } from '../middleware/error-handling.middleware';
import { UserJwtPayload } from '../services/token.service';

export const createPost = async (
  req: Request,
  res: Response,
  user: UserJwtPayload,
): Promise<Response<Post | void>> => {
  const newPostData = postRepository.create({
    author: user,
    parent: req.body.parent,
    content: req.body.content,
  });
  const newPost = await postRepository.save(newPostData);
  return res.status(201).json(newPost);
};

export const getPost: RequestHandler = async (req, res) => {
  const post = await postRepository.findOne({
    where: {
      id: req.params.id,
    },
    relations: ['children', 'parent', 'author', 'votes'],
  });
  if (!post) {
    throw new HttpError(404, 'Post not found');
  }

  return res.status(200).json(post);
};

export const getPostVotes: RequestHandler = async (req, res) => {
  const votes = await voteRepository.find({
    where: {
      post: {
        id: req.params.id,
      },
    },
    relations: ['user', 'post'],
  });

  return res.status(200).json(votes);
};
