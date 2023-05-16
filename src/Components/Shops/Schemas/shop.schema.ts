import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Shop {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  address: string;

  @Prop()
  districtId: number;
}

export type ShopDocument = HydratedDocument<Shop>;

export const ShopSchema = SchemaFactory.createForClass(Shop);
