import { PersistFilePortResponse } from '../out/persist-file.port';
import { UploadFilePortDto } from '../out/upload-file.port';

export abstract class RegisterFileUseCase {
  abstract register(
    ...dto: UploadFilePortDto[]
  ): Promise<PersistFilePortResponse[]>;
}
