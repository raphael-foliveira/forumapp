import { threadRepository } from '../entities/thread.entity';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { postRepository } from '../entities/post.entity';
import { subforumRepository } from '../entities/subforum.entity';

export const getThreadsHandler = async (_: Request, res: Response) => {
  const allThreads = await threadRepository.find({
    relations: ['post'],
  });
  res.status(200).json(allThreads);
};

export const getThread = async (req: Request, res: Response) => {
  try {
    const singleThread = await threadRepository.findOne({
      where: {
        id: req.params.id,
      },
      relations: ['post'],
    });
    if (!singleThread) {
      console.log(`Thread ${req.params.id} not found`);

      res.sendStatus(404);
      return;
    }
    console.log('Found thread:');
    console.log(singleThread);
    res.status(200).json(singleThread);
  } catch (exception) {
    console.log(exception);
    res.status(400).json({
      error: 'bad uuid',
    });
  }
};

export const createThreadHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.query.subForumName || !req.body.postId || !req.user) {
    res.sendStatus(400);
    return;
  }

  const subForum = await subforumRepository.findOne({
    where: {
      name: req.query.subForumName as string,
    },
  });

  if (!subForum) {
    res.status(400).json({
      message: 'SubForum does not exist.',
    });
    return;
  }

  const post = await postRepository.findOne({
    where: {
      id: req.body.postId,
    },
  });

  if (!post) {
    res.status(404).json({
      error: 'Post not found',
    });
    return;
  }

  const threadData = {
    title: req.body.title,
    content: req.body.content,
    image: req.file?.path || '',
    subForum: subForum,
    post: post,
  };

  try {
    const threadObject = threadRepository.create(threadData);
    const newThread = await threadRepository.save(threadObject);
    res.status(201).json(newThread);
  } catch (e) {
    res.status(400).json(e);
  }
};
