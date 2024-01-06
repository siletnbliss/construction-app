import { PersistProjectResponse } from './persist-project.port';

export abstract class RetrieveProjectsPort {
  abstract getOne(id: string): Promise<PersistProjectResponse>;

  abstract getMany(ownerId?: string): Promise<PersistProjectResponse[]>;
}
