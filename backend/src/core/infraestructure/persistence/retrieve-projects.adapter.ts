import { Injectable } from '@nestjs/common';
import {
  RetrieveProjectsPort,
  RetrieveProjectsPortResponse,
} from 'src/core/application/port/out/retrieve-projects.port';
import { ProjectRepository } from './project.repository';

@Injectable()
export class RetrieveProjectsAdapter implements RetrieveProjectsPort {
  constructor(private repo: ProjectRepository) {}

  async getOne(id: string): Promise<RetrieveProjectsPortResponse> {
    return await this.repo.findOne(id);
  }

  async getMany(ownerId?: string): Promise<RetrieveProjectsPortResponse[]> {
    return this.repo.findMany(ownerId);
  }
}
