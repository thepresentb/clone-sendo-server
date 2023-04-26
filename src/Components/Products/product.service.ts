import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/Base/AbstractService.base';
import { Product } from './Schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindPaginatedProductDto } from './dto/findPaginatedProduct.dto';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectModel(Product.name) private productService: Model<Product>,
  ) {
    super(productService);
  }

  async findWithPopulate(filter: any, fields: string[]): Promise<Product[]> {
    return await this.productService.find(filter).populate(fields);
  }

  async findPaginatedProducts(
    findPaginatedProductDto: FindPaginatedProductDto,
  ): Promise<any> {
    if (findPaginatedProductDto?.filter?.name) {
      findPaginatedProductDto.filter.name = new RegExp(
        findPaginatedProductDto.filter.name,
        'i',
      );
    }

    const total = await this.productService
      .count(findPaginatedProductDto.filter)
      .sort(findPaginatedProductDto.orderBy);

    const lastProduct = await this.productService
      .find(findPaginatedProductDto.filter)
      .sort(findPaginatedProductDto.orderBy)
      .limit(1);

    const paginatedProducts = await this.productService
      .find(findPaginatedProductDto.filter)
      .populate(['shopId', 'saleId'])
      .sort(findPaginatedProductDto.orderBy)
      .limit(findPaginatedProductDto.limit);

    return {
      total,
      cursor:
        paginatedProducts.length !== 0
          ? paginatedProducts[paginatedProducts.length - 1].createdAt
          : new Date(),
      hasMore:
        paginatedProducts.length !== 0
          ? paginatedProducts[
              paginatedProducts.length - 1
            ].createdAt.toString() !== lastProduct[0].createdAt.toString()
          : false,
      paginatedProducts,
    };
  }
}
