import { Injectable } from '@nestjs/common';
import { GetProjectsUseCase } from '../port/in/get-projects.use-case';
import { PersistProjectResponse } from '../port/out/persist-project.port';
import { RetrieveProjectsPort } from '../port/out/retrieve-projects.port';

@Injectable()
export class GetProjectsService implements GetProjectsUseCase {
  constructor(private retrieveProjectsPort: RetrieveProjectsPort) {}

  getOne(id: string): Promise<PersistProjectResponse> {
    return this.retrieveProjectsPort.getOne(id);
  }
  getMany(): Promise<PersistProjectResponse[]> {
    return this.retrieveProjectsPort.getMany();
  }
}
