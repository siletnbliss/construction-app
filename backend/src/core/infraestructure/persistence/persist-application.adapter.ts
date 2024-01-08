import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from 'src/core/application/port/in/create-application.use-case';
import {
  PersistApplicationPort,
  PersistApplicationResponse,
} from 'src/core/application/port/out/persist-application.port';
import { ApplicationRepository } from './application.repository';

@Injectable()
export class PersistApplicationAdapter implements PersistApplicationPort {
  constructor(private applicationRepository: ApplicationRepository) {}

  async save(dto: CreateApplicationDto): Promise<PersistApplicationResponse> {
    const result = await this.applicationRepository.create(dto);
    return result;
  }
}
