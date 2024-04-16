import { Agent, agent } from 'supertest';
import { createApp } from '../../app';

describe('authController', () => {
  let request: Agent;

  beforeEach(() => {
    const app = createApp();
    request = agent(app);
  });

  it('should log a user in', async () => {
    const { status } = await request.post('/auth/login');

    expect(status).toBe(200);
  });
});
