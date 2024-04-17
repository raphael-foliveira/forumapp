import jwt from 'jsonwebtoken';
import { jwtPayloadStub } from '../../stubs/token.stubs';

export const jwtSignSpy = jest
  .spyOn(jwt, 'sign')
  .mockImplementation(() => 'valid-token');

export const jwtVerifySpy = jest
  .spyOn(jwt, 'verify')
  .mockImplementation(() => jwtPayloadStub);
