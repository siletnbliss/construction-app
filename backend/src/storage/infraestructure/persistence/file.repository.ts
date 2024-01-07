import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from './schemas/file.schema';
import { ClientSession, Model } from 'mongoose';
import {
  PersistFilePortDto,
  PersistFilePortResponse,
} from 'src/storage/application/port/out/persist-file.port';

@Injectable()
export class FileRepository {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  private map(file: FileDocument): PersistFilePortResponse {
    return { ...file.toJSON(), id: file._id.toString() };
  }

  async create(
    files: PersistFilePortDto[],
    session?: ClientSession,
  ): Promise<PersistFilePortResponse[]> {
    const result = await this.fileModel.create(files, { session });
    return result.map(this.map);
  }
}
