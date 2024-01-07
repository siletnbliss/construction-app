import { Injectable } from '@nestjs/common';
import { RegisterFileUseCase } from '../port/in/register-file.use-case';
import {
  UploadFilePort,
  UploadFilePortDto,
} from '../port/out/upload-file.port';
import {
  PersistFilePort,
  PersistFilePortDto,
  PersistFilePortResponse,
} from '../port/out/persist-file.port';

@Injectable()
export class RegisterFileService implements RegisterFileUseCase {
  constructor(
    private uploadPort: UploadFilePort,
    private persistPort: PersistFilePort,
  ) {}
  // upload files and persist to database
  async register(
    ...dto: UploadFilePortDto[]
  ): Promise<PersistFilePortResponse[]> {
    const uploadedFiles = await Promise.all(
      dto.map(async (item) => this.uploadPort.upload(item)),
    );
    return await this.persistPort.save(
      ...uploadedFiles.map<PersistFilePortDto>((file) => ({
        name: file.name,
        url: file.path,
      })),
    );
  }
}
