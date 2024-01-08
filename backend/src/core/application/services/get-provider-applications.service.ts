import { Injectable } from '@nestjs/common';
import {
  GetProviderApplicationDto,
  GetProviderApplicationsUseCase,
} from '../port/in/get-provider-applications.use-case';
import { PersistApplicationResponse } from '../port/out/persist-application.port';
import { RetrieveApplicationsPort } from '../port/out/retrieve-applications.port';

@Injectable()
export class GetProviderApplicationsService
  implements GetProviderApplicationsUseCase
{
  constructor(private port: RetrieveApplicationsPort) {}

  getApplication(
    dto: GetProviderApplicationDto,
  ): Promise<PersistApplicationResponse> {
    return this.port.getOne(dto);
  }
  getAllApplications(
    providerId: string,
  ): Promise<PersistApplicationResponse[]> {
    return this.port.getMany({ providerId: providerId });
  }
}
