import { Agent, agent } from 'supertest';
import { createApp } from '../../app';
import {
  userFindOneSpy,
  userUpdateSpy,
} from '../../test/mocks/repository/user.mocks';
import { jwtSignSpy, jwtVerifySpy } from '../../test/mocks/service/token.mocks';
import { userStub } from '../../test/stubs/user.stubs';

describe('authController', () => {
  let request: Agent;

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
