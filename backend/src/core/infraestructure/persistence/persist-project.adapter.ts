import { Injectable } from '@nestjs/common';
import { CreateProjectUseCaseDto } from 'src/core/application/port/in/create-project.use-case';
import {
  PersistProjectPort,
  PersistProjectResponse,
} from 'src/core/application/port/out/persist-project.port';
import { ProjectRepository } from './project.repository';

@Injectable()
export class PersistProjectAdapter implements PersistProjectPort {
  constructor(private projectRepository: ProjectRepository) {}

  async save(dto: CreateProjectUseCaseDto): Promise<PersistProjectResponse> {
    return this.projectRepository.create(dto);
  }
}
