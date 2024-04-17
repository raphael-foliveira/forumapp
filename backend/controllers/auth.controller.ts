import { RequestHandler } from 'express';
import { userRepository } from '../entities/user.entity';
import { getUserFromToken } from '../services/token.service';
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
    throw new HttpError(401, 'Credenciais inválidas');
  }

  const token = tokenService.signToken({
    id: user.id,
    username: user.username,
    email: user.email,
  });

  await userRepository.update({ id: user.id }, { token });

  return res
    .status(200)
    .json({ token: token, username: user.username, userId: user.id });
};

export const logOut: RequestHandler = async (req, res) => {
  const { userData } = await tokenService.verifyAuthToken(req);
  await userRepository.update({ id: userData.id }, { token: undefined });
  return res.status(200).json({ message: 'logged out' });
};

export const checkToken: RequestHandler = async ({ body }, res) => {
  const user = await getUserFromToken(body.token);
  return res.status(200).json(user);
};
