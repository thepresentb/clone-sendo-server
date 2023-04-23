import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/Base/AbstractService.base';
import { Product } from './Schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectModel(Product.name) private productService: Model<Product>,
  ) {
    super(productService);
  }

  async findPopulate() {
    return await this.productService.find();
    // .populate(['shopId', 'brandId', 'saleId', 'categoryDetailId']);
  }
}
