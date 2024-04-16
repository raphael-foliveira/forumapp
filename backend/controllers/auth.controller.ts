import { RequestHandler } from 'express';
import { userRepository } from '../entities/user.entity';
import { getUserFromToken } from '../services/token.service';
import { invalidTokenRepository } from '../entities/invalidToken.entity';
import { HttpError } from '../middleware/error-handling.middleware';
import { tokenService } from '../services';

export const logIn: RequestHandler = async ({ body }, res) => {
  const { password, username } = body;
  const user = await userRepository.findOne({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });

  if (!user || user.password !== password) {
    throw new HttpError(400, 'Credenciais inválidas');
  }

  const token = tokenService.signToken({
    id: user.id,
    username: user.username,
    email: user.email,
  });

  return res
    .status(201)
    .json({ token: token, username: user.username, userId: user.id });
};

export const logOut: RequestHandler = async ({ body }, res) => {
  const { token, userId } = body;

  const newInvalidToken = invalidTokenRepository.create({
    owner: {
      id: userId,
    },
    token,
  });

  const savedInvalidToken = await invalidTokenRepository.save(newInvalidToken);

  return res.status(201).json(savedInvalidToken);
};

export const checkToken: RequestHandler = async ({ body }, res) => {
  const user = await getUserFromToken(body.token);
  return res.status(200).json(user);
};
