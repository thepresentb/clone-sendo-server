import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

@Schema()
export class CategoryDetail {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  imgUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: mongoose.Schema.Types.ObjectId;
}

export type CategoryDetailDocument = HydratedDocument<CategoryDetail>;

export const CategoryDetailSchema =
  SchemaFactory.createForClass(CategoryDetail);
