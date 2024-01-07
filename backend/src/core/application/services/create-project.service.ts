import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateProjectUseCase,
  CreateProjectUseCaseDto,
} from '../port/in/create-project.use-case';
import {
  PersistProjectPort,
  PersistProjectResponse,
} from '../port/out/persist-project.port';
import { UploadFilePort } from 'src/storage/application/port/out/upload-file.port';

@Injectable()
export class CreateProjectService implements CreateProjectUseCase {
  constructor(
    private persistProjectPort: PersistProjectPort,
    private uploadFilePort: UploadFilePort,
  ) {}

  async createProject(
    dto: CreateProjectUseCaseDto,
  ): Promise<PersistProjectResponse> {
    if (!dto.images.length) {
      throw new BadRequestException('Missing images');
    }
    const images = await Promise.all(
      dto.images.map(
        async (image) =>
          await this.uploadFilePort.upload({
            file: image,
            folder: `/projects/${dto.ownerId}`,
          }),
      ),
    );
    return this.persistProjectPort.save(dto);
  }
}
