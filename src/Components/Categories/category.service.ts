import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../Schemas/category.schema';
import { CategoryDetail } from 'src/Schemas/categoryDetails.schema';
import { BaseService } from 'src/Base/AbstractService.base';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {
    super(categoryModel);
  }
}

@Injectable()
export class CategoryDetailService extends BaseService<CategoryDetail> {
  constructor(
    @InjectModel(CategoryDetail.name)
    private categoryDetailModel: Model<CategoryDetail>,
  ) {
    super(categoryDetailModel);
  }

  public async findOnePopulate(filter: any): Promise<CategoryDetail> {
    return await this.categoryDetailModel
      .findOne(filter)
      .populate('categoryId')
      .exec();
  }
}
