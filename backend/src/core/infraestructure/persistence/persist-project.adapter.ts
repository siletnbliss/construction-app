import { Injectable } from '@nestjs/common';
import {
  PersistProjectPort,
  PersistProjectPortDto,
  PersistProjectResponse,
} from 'src/core/application/port/out/persist-project.port';
import { ProjectRepository } from './project.repository';

@Injectable()
export class PersistProjectAdapter implements PersistProjectPort {
  constructor(private projectRepository: ProjectRepository) {}

  async save(dto: PersistProjectPortDto): Promise<PersistProjectResponse> {
    return this.projectRepository.create(dto);
  }
}
