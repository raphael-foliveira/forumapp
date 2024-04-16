import { randomUUID } from 'crypto';
import { Agent, agent } from 'supertest';
import { createApp } from '../../app';
import User, { userRepository } from '../../entities/user.entity';
import jwt from 'jsonwebtoken';

describe('authController', () => {
  let request: Agent;
  const userStub: User = {
    email: 'stub@email.com',
    friends: [],
    id: randomUUID(),
    username: 'stubUser',
    password: 'stubpassword',
    posts: [],
    profilePicture: '',
    subForums: [],
    votes: [],
  };

  const findOneSpy = jest
    .spyOn(userRepository, 'findOne')
    .mockResolvedValue(userStub);

  const jwtSignSpy = jest
    .spyOn(jwt, 'sign')
    .mockReturnValue('validToken' as unknown as void);

  beforeEach(() => {
    jest.clearAllMocks();
    const app = createApp();
    request = agent(app);
  });

  it('should log a user in', async () => {
    const { status } = await request
      .post('/auth/login')
      .send({ username: userStub.username, password: userStub.password });

    expect(status).toBe(200);
    expect(findOneSpy).toHaveBeenCalled();
    expect(jwtSignSpy).toHaveBeenCalled();
  });

  it('should return 401 when given invalid credentials', async () => {
    const { status } = await request
      .post('/auth/login')
      .send({ username: userStub.username, password: 'wrong-password' });

    expect(status).toBe(401);
    expect(findOneSpy).toHaveBeenCalled();
    expect(jwtSignSpy).not.toHaveBeenCalled();
  });
});
