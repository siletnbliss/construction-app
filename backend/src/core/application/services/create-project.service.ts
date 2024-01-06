import { Injectable } from '@nestjs/common';
import {
  CreateProjectUseCase,
  CreateProjectUseCaseDto,
} from '../port/in/create-project.use-case';
import {
  PersistProjectPort,
  PersistProjectResponse,
} from '../port/out/persist-project.port';

@Injectable()
export class CreateProjectService implements CreateProjectUseCase {
  constructor(private persistProjectPort: PersistProjectPort) {}

  async createProject(
    dto: CreateProjectUseCaseDto,
  ): Promise<PersistProjectResponse> {
    return this.persistProjectPort.save(dto);
  }
}
