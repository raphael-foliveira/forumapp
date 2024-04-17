import { userRepository } from '../../../entities/user.entity';
import { userStub } from '../../stubs/user.stubs';

export const userFindOneSpy = jest
  .spyOn(userRepository, 'findOne')
  .mockImplementation(async () => userStub);

export const userUpdateSpy = jest
  .spyOn(userRepository, 'update')
  .mockImplementation(async () => ({ generatedMaps: [], raw: [] }));
