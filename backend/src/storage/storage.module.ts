import { Module } from '@nestjs/common';
import { UploadFilePort } from './application/port/out/upload-file.port';
import { UploadFileAdapter } from './infraestructure/persistence/upload-file.adapter';
import { FirebaseConfigService } from './infraestructure/persistence/firebase.config';

@Module({
  providers: [
    { provide: UploadFilePort, useClass: UploadFileAdapter },
    FirebaseConfigService,
  ],
  exports: [{ provide: UploadFilePort, useClass: UploadFileAdapter }],
})
export class StorageModule {}
