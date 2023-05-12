import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Bill {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' })
  paymentMethodId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BillStatus' })
  billStatusId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ShipMethod' })
  shipMethodId: mongoose.Schema.Types.ObjectId;

  @Prop()
  shipPrice: number;

  @Prop({ default: null })
  deliveryDate: Date;

  @Prop({ default: null })
  receivedAt: Date;

  @Prop({ default: null })
  notification: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: null })
  deletedAt?: Date;
}

export type BillDocument = HydratedDocument<Bill>;

export const BillSchema = SchemaFactory.createForClass(Bill);

BillSchema.set('timestamps', true);
