import { NextFunction, Request, RequestHandler, Response } from 'express';
import User from '../entities/user.entity';
import { getUserFromToken } from '../services/token.service';
import { z } from 'zod';
import { invalidTokenRepository } from '../entities/invalidToken.entity';

export interface AuthenticatingRequest extends Request {
  user?: User;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}

export const verifyToken = async (
  req: AuthenticatingRequest,
  res: Response,
  next: NextFunction,
) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === 'undefined') {
    res.status(403).json({
      message: 'Token not found.',
    });
    return;
  }
  const bearer = bearerHeader;
  const bearerToken = bearer.split(' ')[1];

  const invalidToken = await invalidTokenRepository.findOne({
    where: {
      token: bearerToken,
    },
  });

  if (invalidToken) {
    res.status(403).json({
      json: 'This token is invalid.',
    });
    return;
  }

  const authenticatedUser = await getUserFromToken(bearerToken);
  if (!authenticatedUser) {
    res.status(403).json({
      message: 'Invalid Token',
    });
    return;
  }
  req.user = authenticatedUser;
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
