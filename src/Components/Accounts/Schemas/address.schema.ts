import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Address {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  accountId: mongoose.Schema.Types.ObjectId;

  @Prop()
  receiver: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  provinceName: string;

  @Prop()
  provinceId: number;

  @Prop()
  districtName: string;

  @Prop()
  districtId: number;

  @Prop()
  wardName: string;

  @Prop()
  wardCode: number;

  @Prop()
  homeAddress: string;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: null })
  deletedAt?: Date;
}

export type AddressDocument = HydratedDocument<Address>;

export const AddressSchema = SchemaFactory.createForClass(Address);

AddressSchema.set('timestamps', true);
