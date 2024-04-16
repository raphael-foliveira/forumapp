import { Request, Response } from 'express';
import { userRepository } from '../entities/user.entity';
import jwt, { Secret } from 'jsonwebtoken';
import { getUserFromToken } from '../services/token.service';
import { invalidTokenRepository } from '../entities/invalidToken.entity';

export const logInHandler = async (req: Request, res: Response) => {
  console.log('Loggin user in...');
  const user = await userRepository.findOne({
    where: {
      username: req.body.username,
    },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });
  if (user && user.password === req.body.password) {
    console.log(`Correct password for user ${user.username}`);

    const token = jwt.sign(
      {
        username: req.body.username,
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as Secret,
      { expiresIn: '120h' },
    );
    res
      .status(201)
      .json({ token: token, username: user.username, userId: user.id });
    return;
  }
  console.log('Authentication failed');
  res.status(404).json({
    error: 'Credenciais inválidas.',
  });
};

export const logOutHandler = async (req: Request, res: Response) => {
  const { token, userId } = req.body;

  const newInvalidToken = invalidTokenRepository.create({
    owner: {
      id: userId,
    },
    token,
  });

  const savedInvalidToken = await invalidTokenRepository.save(newInvalidToken);
  if (!savedInvalidToken) {
    res.status(500).json({
      error: 'Something went wrong.',
    });
    return;
  }

  console.log('Token invalidated');
  console.log(savedInvalidToken);

  res.status(201).json(savedInvalidToken);
};

export const checkToken = async (req: Request, res: Response) => {
  const user = await getUserFromToken(req.body.token);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  console.log('Authenticated from token:');
  console.log(user);
  res.status(200).json(user);
};
