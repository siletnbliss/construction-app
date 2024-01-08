import { PersistApplicationResponse } from './persist-application.port';

export interface RetrieveApplicationsDto {
  providerId?: string;
  projectId?: string;
}

export interface RetrieveApplicationsResponse
  extends PersistApplicationResponse {}

export abstract class RetrieveApplicationsPort {
  abstract getMany(
    dto: RetrieveApplicationsDto,
  ): Promise<RetrieveApplicationsResponse[]>;

  abstract getOne(
    dto: Required<RetrieveApplicationsDto>,
  ): Promise<RetrieveApplicationsResponse>;
}
