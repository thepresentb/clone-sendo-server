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

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  productId?: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Date })
  startAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  endAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  deletedAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;
}

export type SaleDocument = HydratedDocument<Sale>;

export const SaleSchema = SchemaFactory.createForClass(Sale);

SaleSchema.set('timestamps', true);
