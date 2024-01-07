import { Injectable } from '@nestjs/common';
import {
  PersistFilePort,
  PersistFilePortDto,
  PersistFilePortResponse,
} from 'src/storage/application/port/out/persist-file.port';
import { FileRepository } from './file.repository';

@Injectable()
export class PersistFileAdapter implements PersistFilePort {
  constructor(private repo: FileRepository) {}
  save(...dto: PersistFilePortDto[]): Promise<PersistFilePortResponse[]> {
    return this.repo.create(dto);
  }
}
