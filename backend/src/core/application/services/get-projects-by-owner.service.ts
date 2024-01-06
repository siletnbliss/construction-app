import { Injectable } from '@nestjs/common';
import { PersistProjectResponse } from '../port/out/persist-project.port';
import { RetrieveProjectsPort } from '../port/out/retrieve-projects.port';
import { GetProjectsByOwnerUseCase } from '../port/in/get-projects-by-owner.use-case';

@Injectable()
export class GetProjectsByOwnerService implements GetProjectsByOwnerUseCase {
  constructor(private retrieveProjectsPort: RetrieveProjectsPort) {}

  getProjects(ownerId: string): Promise<PersistProjectResponse[]> {
    return this.retrieveProjectsPort.getMany(ownerId);
  }
}
