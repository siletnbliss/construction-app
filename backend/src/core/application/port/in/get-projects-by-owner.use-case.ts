import { PersistProjectResponse } from '../out/persist-project.port';

export abstract class GetProjectsByOwnerUseCase {
  abstract getProjects(ownerId: string): Promise<PersistProjectResponse[]>;
}
