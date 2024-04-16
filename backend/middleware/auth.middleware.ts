import { NextFunction, Request, RequestHandler, Response } from 'express';
import User from '../entities/user.entity';
import { z } from 'zod';
import { extractTokenFromHeader } from '../services/token.service';

export interface AuthenticatingRequest extends Request {
  user?: User;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}

export const verifyToken = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  await extractTokenFromHeader(req);
  next();
};

export const validateLogoutBody = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const logoutSchema = z.object({
    token: z.string(),
    userId: z.string(),
  });

  req.body = logoutSchema.parse(req.body);
  next();
};

export const validateCheckTokenBody: RequestHandler = (req, _, next) => {
  const checkTokenSchema = z.object({
    token: z.string(),
  });

  req.body = checkTokenSchema.parse(req.body);
  next();
};
