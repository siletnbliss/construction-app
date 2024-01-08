import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type SupplyDocument = mongoose.HydratedDocument<Supply>;

@Schema()
export class Supply {
  @Prop({ required: false })
  unitPrice: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectItem',
    required: true,
  })
  itemId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  })
  applicationId: string;
}

export const SupplySchema = SchemaFactory.createForClass(Supply);
