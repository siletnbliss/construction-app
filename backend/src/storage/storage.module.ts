import { Module } from '@nestjs/common';
import { UploadFilePort } from './application/port/out/upload-file.port';
import { UploadFileAdapter } from './infraestructure/persistence/upload-file.adapter';
import { FirebaseConfigService } from './infraestructure/persistence/firebase.config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  File,
  FileSchema,
} from './infraestructure/persistence/schemas/file.schema';
import { RegisterFileUseCase } from './application/port/in/register-file.use-case';
import { RegisterFileService } from './application/services/register-file.use.case';
import { PersistFilePort } from './application/port/out/persist-file.port';
import { PersistFileAdapter } from './infraestructure/persistence/persist-file.adapter';
import { FileRepository } from './infraestructure/persistence/file.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [
    { provide: UploadFilePort, useClass: UploadFileAdapter },
    FirebaseConfigService,
    { provide: RegisterFileUseCase, useClass: RegisterFileService },
    { provide: PersistFilePort, useClass: PersistFileAdapter },
    FileRepository,
  ],
  exports: [{ provide: RegisterFileUseCase, useClass: RegisterFileService }],
})
export class StorageModule {}
