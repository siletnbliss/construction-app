import { PersistApplicationResponse } from '../out/persist-application.port';

export abstract class GetProjectApplicationsUseCase {
  abstract getApplications(
    projectId: string,
  ): Promise<PersistApplicationResponse[]>;
}
