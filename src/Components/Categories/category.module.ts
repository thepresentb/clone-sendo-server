import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './Schemas/category.schema';
import { CategoryController } from './category.controller';
import { CategoryDetailService, CategoryService } from './category.service';
import {
  CategoryDetail,
  CategoryDetailSchema,
} from 'src/Components/Categories/Schemas/categoryDetails.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: CategoryDetail.name, schema: CategoryDetailSchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryDetailService],
})
export class CategoryModule {}
