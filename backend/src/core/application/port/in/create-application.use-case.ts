import { PersistApplicationResponse } from '../out/persist-application.port';

export interface CreateApplicationDto {
  projectId: string;
  providerId: string;
  items: {
    itemId: string;
    unitPrice?: number;
  }[];
}

export abstract class CreateApplicationUseCase {
  abstract createApplication(
    dto: CreateApplicationDto,
  ): Promise<PersistApplicationResponse>;
}
