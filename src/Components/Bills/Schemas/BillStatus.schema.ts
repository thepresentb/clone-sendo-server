import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class BillStatus {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  code: string;
}

export type BillStatusDocument = HydratedDocument<BillStatus>;

export const BillStatusSchema = SchemaFactory.createForClass(BillStatus);
