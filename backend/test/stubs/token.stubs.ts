import { UserJwtPayload } from '../../services/token.service';
import { userStub } from './user.stubs';

export const jwtPayloadStub: UserJwtPayload = {
  id: userStub.id,
  email: userStub.email,
  username: userStub.username,
};
