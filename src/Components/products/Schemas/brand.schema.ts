import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Brand {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  code: string;
}

export type BrandDocument = HydratedDocument<Brand>;

export const BrandSchema = SchemaFactory.createForClass(Brand);
