import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Product {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  imgUrl: string;

  @Prop({ default: false })
  isInstallment?: boolean;

  @Prop({ default: false })
  isExpressDelivery?: boolean;

  @Prop()
  quantity: number;

  @Prop()
  total: number;

  @Prop()
  price: number;

  @Prop({ default: 0 })
  rate: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CategoryDetail' })
  categoryDetailId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shopId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brandId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sale', default: null })
  saleId?: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: null })
  deletedAt?: Date;
}

export type ProductDocument = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.set('timestamps', true);
