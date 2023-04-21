import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';

@Schema()
export class Sale {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  salePercent: number;

  @Prop()
  saleStatus: boolean;

  @Prop()
  startAt: string;

  @Prop()
  endAt: string;

  @Prop()
  deletedAt: string;

  @Prop()
  updatedAt: string;

  @Prop()
  createdAt: string;
}

export type SaleDocument = HydratedDocument<Sale>;

export const SaleSchema = SchemaFactory.createForClass(Sale);

SaleSchema.set('timestamps', true);
