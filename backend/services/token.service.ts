import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import User, { userRepository } from '../entities/user.entity';
import { HttpError } from '../middleware/error-handling.middleware';
import { invalidTokenRepository } from '../entities/invalidToken.entity';
import { environment } from '../config/environment';

export interface UserJwtPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
}

export const verifyToken = (token: string): UserJwtPayload => {
  return jwt.verify(token, environment.jwt.secret) as UserJwtPayload;
};

export const signToken = (payload: UserJwtPayload, expiresIn = '120h') => {
  return jwt.sign(payload, environment.jwt.secret, {
    expiresIn,
  });
};

export const getUserFromToken = async (token: string): Promise<User> => {
  const decodedToken = verifyToken(token);

  const authenticatedUser = await userRepository.findOne({
    where: {
      id: decodedToken.id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      profilePicture: true,
    },
  });

  if (!authenticatedUser) {
    throw new HttpError(401, 'Invalid Token');
  }

  return authenticatedUser;
};
export const extractTokenFromHeader = async ({
  headers,
}: Request): Promise<string> => {
  const tokenPrefix = 'Bearer ';
  const authorization = headers.authorization;
  if (!authorization) {
    throw new HttpError(401, 'Missing Authorization header');
  }
  if (!authorization.includes(tokenPrefix)) {
    throw new HttpError(401, 'Malformed Token');
  }

  const token = authorization.split(tokenPrefix)[1];
  if (!token) {
    throw new HttpError(401, 'Malformed Token');
  }

  const invalidToken = await invalidTokenRepository.findOne({
    where: {
      token,
    },
  });

  if (invalidToken) {
    throw new HttpError(401, 'Invalid Token');
  }

  return token;
};

export const getUserFromRequest = async (req: Request) => {
  const token = await extractTokenFromHeader(req);
  const user = getUserFromToken(token);
  return user;
};
