import { Injectable } from '@nestjs/common';
import {
  UploadFilePort,
  UploadFilePortDto,
  UploadFilePortResponse,
} from 'src/storage/application/port/out/upload-file.port';
import { initializeApp } from 'firebase/app';
import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { FirebaseConfigService } from './firebase.config';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadFileAdapter implements UploadFilePort {
  private storage: FirebaseStorage;
  constructor(private firebaseConfig: FirebaseConfigService) {
    const app = initializeApp(this.firebaseConfig.getConfig());
    const storage: FirebaseStorage = getStorage(app);
    this.storage = storage;
  }

  private createPersistentDownloadUrl(bucket: string, pathToFile: string) {
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
      pathToFile,
    )}?alt=media`;
  }

  async upload(dto: UploadFilePortDto): Promise<UploadFilePortResponse> {
    const filename = `${dto.filename || randomUUID()}.${dto.file.originalname
      .split('.')
      .pop()}`;
    const storageDest = dto.folder + '/' + filename;
    const storageRef = ref(this.storage, storageDest);

    const uploadTask = await uploadBytes(storageRef, dto.file.buffer, {
      contentType: dto.file.mimetype,
    });
    const uploadedTo = this.createPersistentDownloadUrl(
      uploadTask.ref.bucket,
      uploadTask.metadata.fullPath,
    );

    return {
      name: uploadTask.metadata.name,
      path: uploadedTo,
    };
  }
}
