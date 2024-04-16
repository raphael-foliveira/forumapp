import { Request, Response } from 'express';
import Post, { postRepository } from '../entities/post.entity';
import { voteRepository } from '../entities/vote.entity';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const createPostHandler = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<Post | void> => {
  try {
    const newPostData = postRepository.create({
      author: req.user,
      parent: req.body.parent,
      content: req.body.content,
    });
    const newPost = await postRepository.save(newPostData);
    res.status(201).json(newPost);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getPostHandler = async (req: Request, res: Response) => {
  const post = await postRepository.findOne({
    where: {
      id: req.params.id,
    },
    relations: ['children', 'parent', 'author', 'votes'],
  });
  if (!post) {
    console.log('Post not found.');
    res.sendStatus(404);
    return;
  }
  console.log('Found Post:');
  console.log(post);

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
  console.log('Found Votes');
  console.log(votes);

  res.status(200).json(votes);
};
