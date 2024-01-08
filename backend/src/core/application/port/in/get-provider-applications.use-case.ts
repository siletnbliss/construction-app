import { PersistApplicationResponse } from '../out/persist-application.port';

export interface GetProviderApplicationDto {
  projectId: string;
  providerId: string;
}
export abstract class GetProviderApplicationsUseCase {
  abstract getApplication(
    dto: GetProviderApplicationDto,
  ): Promise<PersistApplicationResponse>;

  abstract getAllApplications(
    providerId: string,
  ): Promise<PersistApplicationResponse[]>;
}
