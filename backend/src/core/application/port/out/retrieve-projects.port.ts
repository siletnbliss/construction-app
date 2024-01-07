import { PersistProjectResponse } from './persist-project.port';

export interface RetrieveProjectsPortResponse
  extends Omit<PersistProjectResponse, 'images'> {
  images: string[];
}

export abstract class RetrieveProjectsPort {
  abstract getOne(id: string): Promise<RetrieveProjectsPortResponse>;

  abstract getMany(ownerId?: string): Promise<RetrieveProjectsPortResponse[]>;
}
