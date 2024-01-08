import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ApplicationDocument = mongoose.HydratedDocument<Application>;

@Schema()
export class Application {
  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  providerId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  })
  projectId: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
