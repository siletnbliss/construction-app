import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateProjectUseCase,
  CreateProjectUseCaseDto,
} from '../port/in/create-project.use-case';
import {
  PersistProjectPort,
  PersistProjectResponse,
} from '../port/out/persist-project.port';
import { RegisterFileUseCase } from 'src/storage/application/port/in/register-file.use-case';
import { UploadFilePortDto } from 'src/storage/application/port/out/upload-file.port';

@Injectable()
export class CreateProjectService implements CreateProjectUseCase {
  constructor(
    private persistProjectPort: PersistProjectPort,
    private registerFileUseCase: RegisterFileUseCase,
  ) {}

  async createProject(
    dto: CreateProjectUseCaseDto,
  ): Promise<PersistProjectResponse> {
    if (!dto.images.length) {
      throw new BadRequestException('Missing images');
    }
    const images = await this.registerFileUseCase.register(
      ...dto.images.map<UploadFilePortDto>((img) => ({
        file: img,
        folder: `/projects/${dto.ownerId}`,
      })),
    );
    return this.persistProjectPort.save({
      ...dto,
      images: images.map((img) => img.id),
    });
  }
}
