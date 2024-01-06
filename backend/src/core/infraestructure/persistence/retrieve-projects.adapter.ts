import { Injectable } from '@nestjs/common';
import { PersistProjectResponse } from 'src/core/application/port/out/persist-project.port';
import { RetrieveProjectsPort } from 'src/core/application/port/out/retrieve-projects.port';
import { ProjectRepository } from './project.repository';

@Injectable()
export class RetrieveProjectsAdapter implements RetrieveProjectsPort {
  constructor(private repo: ProjectRepository) {}
  getOne(id: string): Promise<PersistProjectResponse> {
    return this.repo.findOne(id);
  }

  getMany(ownerId?: string): Promise<PersistProjectResponse[]> {
    return this.repo.findMany(ownerId);
  }
}
