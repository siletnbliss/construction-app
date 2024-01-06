import { PersistProjectResponse } from '../out/persist-project.port';

export interface CreateProjectUseCaseDto {
  title: string;
  location: string;
  description?: string;
  startDate: string;
  finishDate: string;
  published?: boolean;
  ownerId: string;
}

export abstract class CreateProjectUseCase {
  abstract createProject(
    dto: CreateProjectUseCaseDto,
  ): Promise<PersistProjectResponse>;
}
