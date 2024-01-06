import { PersistProjectResponse } from '../out/persist-project.port';

export abstract class GetProjectsUseCase {
  abstract getOne(id: string): Promise<PersistProjectResponse>;

  abstract getMany(): Promise<PersistProjectResponse[]>;
}
