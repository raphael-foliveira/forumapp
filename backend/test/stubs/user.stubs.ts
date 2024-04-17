import { randomUUID } from 'crypto';
import User from '../../entities/user.entity';

export const userStub: User = {
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
