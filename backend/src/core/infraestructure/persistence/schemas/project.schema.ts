import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ProjectDocument = mongoose.HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  finishDate: Date;

  @Prop({ default: false })
  published: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  ownerId: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    required: true,
  })
  images: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
