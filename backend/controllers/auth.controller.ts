import { RequestHandler } from 'express';
import { userRepository } from '../entities/user.entity';
import jwt, { Secret } from 'jsonwebtoken';
import { getUserFromToken } from '../services/token.service';
import { invalidTokenRepository } from '../entities/invalidToken.entity';
import { HttpError } from '../middleware/error-handling.middleware';

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

  const token = jwt.sign(
    {
      username: body.username,
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as Secret,
    { expiresIn: '120h' },
  );
  return res
    .status(201)
    .json({ token: token, username: user.username, userId: user.id });
};

export const logOut: RequestHandler = async (req, res) => {
  const { token, userId } = req.body;

  const newInvalidToken = invalidTokenRepository.create({
    owner: {
      id: userId,
    },
    token,
  });

  const savedInvalidToken = await invalidTokenRepository.save(newInvalidToken);

  return res.status(201).json(savedInvalidToken);
};

export const checkToken: RequestHandler = async (req, res) => {
  const user = await getUserFromToken(req.body.token);
  return res.status(200).json(user);
};
