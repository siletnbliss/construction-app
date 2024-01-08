import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateApplicationDto,
  CreateApplicationUseCase,
} from '../port/in/create-application.use-case';
import {
  PersistApplicationPort,
  PersistApplicationResponse,
} from '../port/out/persist-application.port';
import { GetProjectsUseCase } from '../port/in/get-projects.use-case';

@Injectable()
export class CreateApplicationService implements CreateApplicationUseCase {
  constructor(
    private port: PersistApplicationPort,
    private getProjectUseCase: GetProjectsUseCase,
  ) {}

  async createApplication(
    dto: CreateApplicationDto,
  ): Promise<PersistApplicationResponse> {
    const project = await this.getProjectUseCase.getOne(dto.projectId);

    if (!project)
      throw new BadRequestException(`Project ID not found: ${dto.projectId}`);

    const projectItemsIDS = project.items.map((it) => it.id);
    const itemError = dto.items.some(
      (item) => !projectItemsIDS.includes(item.itemId),
    );

    if (itemError)
      throw new BadRequestException('Item IDs do not match project items');

    return await this.port.save(dto);
  }
}
