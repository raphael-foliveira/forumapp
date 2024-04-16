import { Request, Response } from 'express';
import { dataSource } from '../db/data-source';
import { subforumRepository } from '../entities/subforum.entity';
import { AuthenticatingRequest } from '../middleware/auth.middleware';
import { HttpError } from '../middleware/error-handling.middleware';
import { getUserFromRequest } from '../services/token.service';

export const getSubForumHandler = async (req: Request, res: Response) => {
  console.log(`Searching for ${req.params.name} Sub...`);
  const subForum = await subforumRepository.findOne({
    where: {
      name: req.params.name,
    },
    relations: ['members', 'threads', 'admin'],
  });
  if (!subForum) {
    throw new HttpError(404, 'SubForum not found');
  }

  res.status(200).json(subForum);
};

export const getSubForumsHandler = async (req: Request, res: Response) => {
  const allSubForums = await subforumRepository.find({
    where: {
      name: req.query.name as string,
    },
    order: {
      createdAt: 'DESC',
    },
    relations: ['admin', 'members', 'threads'],
  });
  res.status(200).json(allSubForums);
};

export const updateSubForumHandler = async (req: Request, res: Response) => {
  const subForum = await subforumRepository.update(req.body.id, req.body);
  if (!subForum) {
    throw new HttpError(404, 'SubForum does not exist');
  }
  res.status(200).json(subForum);
};

export const deleteMemberHandler = async (
  req: AuthenticatingRequest,
  res: Response,
) => {
  const response = await dataSource
    .createQueryBuilder()
    .delete()
    .from('sub_forum_members_user')
    .where({
      subForumId: req.params.id,
      userId: req.params.memberid,
    })
    .execute();

  res.status(200).json(response);
};

export const createSubForumHandler = async (req: Request, res: Response) => {
  const user = await getUserFromRequest(req);
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
  res.status(201).json(newSubForum);
};
