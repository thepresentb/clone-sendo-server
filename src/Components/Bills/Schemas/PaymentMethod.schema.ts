import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class PaymentMethod {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  code: string;

  @Prop()
  name: string;
}

export type PaymentMethodDocument = HydratedDocument<PaymentMethod>;

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
