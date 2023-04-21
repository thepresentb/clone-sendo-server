import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Category {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  code: string;
}

export type CategoryDocument = HydratedDocument<Category>;

export const CategorySchema = SchemaFactory.createForClass(Category);
