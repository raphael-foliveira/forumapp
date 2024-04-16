import { Response } from 'express';
import { dataSource } from '../db/data-source';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const addMemberHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const response = await dataSource
      .createQueryBuilder()
      .insert()
      .into('sub_forum_members_user')
      .values(req.body)
      .execute();

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
