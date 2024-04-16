import { Request, Response, NextFunction } from 'express';
import { UserJwtPayload } from '../services/token.service';

export type AuthenticatedRequestHandler = (
  req: Request,
  res: Response,
  user: UserJwtPayload,
  next?: NextFunction,
) => Promise<Response | void>;
