import { Request, Response } from 'express';
import { userRepository } from '../entities/user.entity';

export const getAllUsersHandler = async (_: Request, res: Response) => {
  const allUsers = await userRepository.find();
  res.status(200).json(allUsers);
};

export const getUserHandler = async (req: Request, res: Response) => {
  const user = await userRepository.findOne({
    where: {
      id: req.params.userId,
    },
    relations: ['posts', 'votes'],
    select: {
      id: true,
      username: true,
      email: true,
      profilePicture: true,
    },
  });
  if (!user) {
    res.sendStatus(404);
    return;
  }
  res.status(200).json(user);
};

export const createUserHandler = async (req: Request, res: Response) => {
  const newUserData = req.body;
  try {
    const newUser = userRepository.create({
      email: newUserData.email,
      username: newUserData.username,
      password: newUserData.password,
      profilePicture: req.file?.path || '',
    });
    const result = await userRepository.save(newUser);
    if (!result) {
      res.sendStatus(400);
      return;
    }
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: 'Username or Email already exists.',
    });
  }
};
