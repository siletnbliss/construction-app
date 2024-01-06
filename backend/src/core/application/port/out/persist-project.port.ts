import { CreateProjectUseCaseDto } from '../in/create-project.use-case';

export interface PersistProjectResponse extends CreateProjectUseCaseDto {
  id: string;
}

export abstract class PersistProjectPort {
  abstract save(dto: CreateProjectUseCaseDto): Promise<PersistProjectResponse>;
}
