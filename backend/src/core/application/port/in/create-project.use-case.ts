import { PersistProjectResponse } from '../out/persist-project.port';

export interface CreateProjectUseCaseDto {
  title: string;
  location: string;
  description?: string;
  startDate: string;
  finishDate: string;
  published?: boolean;
  ownerId: string;
  items: CreateProjectItemUseCaseDto[];
  images: Express.Multer.File[];
}

export interface CreateProjectItemUseCaseDto {
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
}

export abstract class CreateProjectUseCase {
  abstract createProject(
    dto: CreateProjectUseCaseDto,
  ): Promise<PersistProjectResponse>;
}
