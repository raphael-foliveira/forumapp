import { randomUUID } from 'crypto';
import { Agent, agent } from 'supertest';
import { createApp } from '../../app';
import User, { userRepository } from '../../entities/user.entity';
import jwt from 'jsonwebtoken';
import { UpdateResult } from 'typeorm';
import { UserJwtPayload } from '../../services/token.service';

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

  const jwtPayloadStub: UserJwtPayload = {
    id: userStub.id,
    email: userStub.email,
    username: userStub.username,
  };

  const updateResultStub: UpdateResult = { generatedMaps: [], raw: [] };

  const userFindOneSpy = jest
    .spyOn(userRepository, 'findOne')
    .mockImplementation(async () => userStub);

  const jwtSignSpy = jest
    .spyOn(jwt, 'sign')
    .mockImplementation(() => 'valid-token');

  const userUpdateSpy = jest
    .spyOn(userRepository, 'update')
    .mockImplementation(async () => updateResultStub);

  const jwtVerifySpy = jest
    .spyOn(jwt, 'verify')
    .mockImplementation(() => jwtPayloadStub);

  beforeEach(() => {
    jest.clearAllMocks();
    const app = createApp();
    request = agent(app);
  });

  describe('logIn', () => {
    it('should log a user in', async () => {
      const { status } = await request
        .post('/auth/login')
        .send({ username: userStub.username, password: userStub.password });

      expect(status).toBe(200);
      expect(userFindOneSpy).toHaveBeenCalled();
      expect(jwtSignSpy).toHaveBeenCalled();
    });

    it('should return 401 when given invalid credentials', async () => {
      const { status } = await request
        .post('/auth/login')
        .send({ username: userStub.username, password: 'wrong-password' });

      expect(status).toBe(401);
      expect(userFindOneSpy).toHaveBeenCalled();
      expect(jwtSignSpy).not.toHaveBeenCalled();
    });
  });

  describe('logOut', () => {
    it('should log an user out', async () => {
      const { status } = await request
        .post('/auth/logout')
        .set({ authorization: 'Bearer super-valid-token' });

      expect(status).toBe(200);
      expect(jwtVerifySpy).toHaveBeenCalled();
      expect(userUpdateSpy).toHaveBeenCalled();
    });

    it('should return 401 if the provided authorization header is invalid', async () => {
      jwtVerifySpy.mockImplementationOnce(() => {
        throw new Error('Invalid token');
      });
      const { status } = await request
        .post('/auth/logout')
        .set({ authorization: 'Bearer invalid-token' });

      expect(status).toBe(401);
    });
  });
});
