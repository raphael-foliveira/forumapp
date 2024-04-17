import { RequestHandler } from 'express';
import { userRepository } from '../entities/user.entity';
import { HttpError } from '../middleware/error-handling.middleware';

export const getAllUsers: RequestHandler = async (_, res) => {
  const allUsers = await userRepository.find();
  return res.status(200).json(allUsers);
};

export const getUser: RequestHandler = async ({ params }, res) => {
  const user = await userRepository.findOne({
    where: {
      id: params.userId,
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
  return res.status(200).json(user);
};

export const createUser: RequestHandler = async (req, res) => {
  const newUser = userRepository.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    profilePicture: req.file?.path || '',
  });
  const result = await userRepository.save(newUser);
  return res.status(201).json(result);
};
