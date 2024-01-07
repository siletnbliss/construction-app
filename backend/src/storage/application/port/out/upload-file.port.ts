export interface UploadFilePortDto {
  file: Express.Multer.File;
  folder: string;
  filename?: string;
}

export interface UploadFilePortResponse {
  name: string;
  path: string;
}

export abstract class UploadFilePort {
  abstract upload(dto: UploadFilePortDto): Promise<UploadFilePortResponse>;
}
