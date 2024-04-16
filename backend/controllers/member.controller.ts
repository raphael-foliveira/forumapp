import { Response, Request } from 'express';
import { dataSource } from '../db/data-source';
import { HttpError } from '../middleware/error-handling.middleware';

export const addMemberHandler = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new HttpError(400, 'Body is invalid');
  }
  const response = await dataSource
    .createQueryBuilder()
    .insert()
    .into('sub_forum_members_user')
    .values(req.body)
    .execute();

  res.status(200).json(response);
};
