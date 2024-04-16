import { Request, Response } from 'express';
import { userRepository } from '../entities/user.entity';
import { HttpError } from '../middleware/error-handling.middleware';

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
    throw new HttpError(404, 'User not found');
  }
  res.status(200).json(user);
};

export const createUserHandler = async (req: Request, res: Response) => {
  const newUserData = req.body;
  const newUser = userRepository.create({
    email: newUserData.email,
    username: newUserData.username,
    password: newUserData.password,
    profilePicture: req.file?.path || '',
  });
  const result = await userRepository.save(newUser);
  res.status(201).json(result);
};
