import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type FileDocument = mongoose.HydratedDocument<File>;

@Schema()
export class File {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
