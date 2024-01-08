import { Injectable } from '@nestjs/common';
import { GetProjectApplicationsUseCase } from '../port/in/get-project-applications.use-case';
import { PersistApplicationResponse } from '../port/out/persist-application.port';
import { RetrieveApplicationsPort } from '../port/out/retrieve-applications.port';

@Injectable()
export class GetProjectApplicationsService
  implements GetProjectApplicationsUseCase
{
  constructor(private port: RetrieveApplicationsPort) {}

  getApplications(projectId: string): Promise<PersistApplicationResponse[]> {
    return this.port.getMany({ projectId: projectId });
  }
}
