import { RequestHandler } from 'express';
import { dataSource } from '../db/data-source';
import { subforumRepository } from '../entities/subforum.entity';
import { HttpError } from '../middleware/error-handling.middleware';
import { AuthenticatedRequestHandler } from '../types/request';

export const getSubForum: RequestHandler = async ({ params }, res) => {
  const subForum = await subforumRepository.findOne({
    where: {
      name: params.name,
    },
    relations: ['members', 'threads', 'admin'],
  });
  if (!subForum) {
    throw new HttpError(404, 'SubForum not found');
  }

  return res.status(200).json(subForum);
};

export const getSubForums: RequestHandler = async ({ query }, res) => {
  const allSubForums = await subforumRepository.find({
    where: {
      name: query.name as string,
    },
    order: {
      createdAt: 'DESC',
    },
    relations: ['admin', 'members', 'threads'],
  });
  return res.status(200).json(allSubForums);
};

export const updateSubForum: AuthenticatedRequestHandler = async (
  { body },
  res,
) => {
  const subForum = await subforumRepository.update(body.id, body);
  if (!subForum) {
    throw new HttpError(404, 'SubForum does not exist');
  }
  return res.status(200).json(subForum);
};

export const deleteMember: AuthenticatedRequestHandler = async (
  { params },
  res,
) => {
  const response = await dataSource
    .createQueryBuilder()
    .delete()
    .from('sub_forum_members_user')
    .where({
      subForumId: params.id,
      userId: params.memberid,
    })
    .execute();

  return res.status(200).json(response);
};

export const createSubForum: AuthenticatedRequestHandler = async (
  req,
  res,
  user,
) => {
  const subForumData = {
    admin: user,
    name: req.body.name,
    description: req.body.description,
    image: req.file?.path || '',
    members: [user],
  };

  const subForumObject = subforumRepository.create(subForumData);
  const newSubForum = await subforumRepository.save(subForumObject);

  if (!newSubForum) {
    throw new HttpError(400, 'Subforum could not be created');
  }
  return res.status(201).json(newSubForum);
};
