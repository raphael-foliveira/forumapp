import { threadRepository } from '../entities/thread.entity';
import { RequestHandler } from 'express';
import { postRepository } from '../entities/post.entity';
import { subforumRepository } from '../entities/subforum.entity';
import { HttpError } from '../middleware/error-handling.middleware';

export const getThreads: RequestHandler = async (_, res) => {
  const allThreads = await threadRepository.find({
    relations: ['post'],
  });
  return res.status(200).json(allThreads);
};

export const getThread: RequestHandler = async (req, res) => {
  const singleThread = await threadRepository.findOne({
    where: {
      id: req.params.id,
    },
    relations: ['post'],
  });

  if (!singleThread) {
    throw new HttpError(404, 'Thread not found');
  }

  return res.status(200).json(singleThread);
};

export const createThread: RequestHandler = async (req, res) => {
  const subForum = await subforumRepository.findOne({
    where: {
      name: req.query.subForumName as string,
    },
  });

  if (!subForum) {
    throw new HttpError(404, 'SubForum not found');
  }

  const post = await postRepository.findOne({
    where: {
      id: req.body.postId,
    },
  });

  if (!post) {
    throw new HttpError(404, 'Post not found');
  }

  const threadData = {
    title: req.body.title,
    content: req.body.content,
    image: req.file?.path || '',
    subForum: subForum,
    post: post,
  };

  const threadObject = threadRepository.create(threadData);
  const newThread = await threadRepository.save(threadObject);
  return res.status(201).json(newThread);
};
