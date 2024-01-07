import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ProjectItemDocument = mongoose.HydratedDocument<ProjectItem>;

@Schema()
export class ProjectItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  })
  projectId: string;
}

export const ProjectItemSchema = SchemaFactory.createForClass(ProjectItem);
