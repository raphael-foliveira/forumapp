import { NextFunction, Request, RequestHandler, Response } from 'express';
import { z } from 'zod';
import { AuthenticatedRequestHandler } from '../controllers/post.controller';
import {
  extractTokenFromHeader,
  getUserFromRequest,
} from '../services/token.service';

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

export const authenticated = (
  fn: AuthenticatedRequestHandler,
): RequestHandler => {
  return async (req, res) => {
    const user = await getUserFromRequest(req);
    return fn(req, res, user);
  };
};
