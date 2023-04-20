import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Category } from './category.schema';

@Schema()
export class CategoryDetail {
  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop()
  imgUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: ObjectId;
}

export type CategoryDetailDocument = HydratedDocument<CategoryDetail>;

export const CategoryDetailSchema =
  SchemaFactory.createForClass(CategoryDetail);
