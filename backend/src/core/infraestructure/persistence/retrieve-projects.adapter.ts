import { Injectable } from '@nestjs/common';
import { PersistProjectResponse } from 'src/core/application/port/out/persist-project.port';
import { RetrieveProjectsPort } from 'src/core/application/port/out/retrieve-projects.port';
import { ProjectRepository } from './project.repository';

@Injectable()
export class RetrieveProjectsAdapter implements RetrieveProjectsPort {
  constructor(private repo: ProjectRepository) {}

  async getOne(id: string): Promise<PersistProjectResponse> {
    return await this.repo.findOne(id);
  }

  async getMany(ownerId?: string): Promise<PersistProjectResponse[]> {
    return this.repo.findMany(ownerId);
  }
}
