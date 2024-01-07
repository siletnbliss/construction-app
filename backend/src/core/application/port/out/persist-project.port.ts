import { CreateProjectUseCaseDto } from '../in/create-project.use-case';

export interface PersistProjectResponse
  extends Omit<CreateProjectUseCaseDto, 'images'> {
  id: string;
  images: string[];
}

export interface PersistProjectPortDto
  extends Omit<CreateProjectUseCaseDto, 'images'> {
  images: string[];
}

export abstract class PersistProjectPort {
  abstract save(dto: PersistProjectPortDto): Promise<PersistProjectResponse>;
}
