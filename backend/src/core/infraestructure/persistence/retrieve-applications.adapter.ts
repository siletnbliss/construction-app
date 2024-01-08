import { Injectable } from '@nestjs/common';
import {
  RetrieveApplicationsDto,
  RetrieveApplicationsPort,
  RetrieveApplicationsResponse,
} from 'src/core/application/port/out/retrieve-applications.port';
import { ApplicationRepository } from './application.repository';

@Injectable()
export class RetrieveApplicationsAdapter implements RetrieveApplicationsPort {
  constructor(private applicationRepository: ApplicationRepository) {}
  getMany(
    dto: RetrieveApplicationsDto,
  ): Promise<RetrieveApplicationsResponse[]> {
    return this.applicationRepository.findMany({
      projectId: dto.projectId,
      providerId: dto.providerId,
    });
  }

  getOne(
    dto: Required<RetrieveApplicationsDto>,
  ): Promise<RetrieveApplicationsResponse> {
    return this.applicationRepository.findOne(dto);
  }
}
