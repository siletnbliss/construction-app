import { CreateApplicationDto } from '../in/create-application.use-case';

export interface PersistApplicationResponse extends CreateApplicationDto {
  id: string;
  date: string;
  items: (CreateApplicationDto['items'][0] & { id: string })[];
}

export abstract class PersistApplicationPort {
  abstract save(dto: CreateApplicationDto): Promise<PersistApplicationResponse>;
}
