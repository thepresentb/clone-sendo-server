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
    const filter: {
      name?: RegExp;
      price?: {
        $gte: number;
        $lte: number;
      };
      rate?: {
        $gte: number;
        $lte: number;
      };
      createdAt?: {
        $lt: Date;
      };
    } = {};
    if (findPaginatedProductDto?.filter) {
      if (findPaginatedProductDto.filter?.name)
        filter.name = new RegExp(findPaginatedProductDto.filter.name, 'i');
      if (findPaginatedProductDto.filter?.price)
        filter.price = {
          $gte: findPaginatedProductDto.filter.price[0],
          $lte: findPaginatedProductDto.filter.price[1],
        };
      if (findPaginatedProductDto.filter?.rate)
        filter.rate = {
          $gte: findPaginatedProductDto.filter.rate[0],
          $lte: findPaginatedProductDto.filter.rate[1],
        };
      if (findPaginatedProductDto.filter?.createdAt) {
        filter.createdAt = {
          $lt: findPaginatedProductDto.filter.createdAt,
        };
      }
    }

    const lastProduct = await this.productService
      .find(filter)
      .sort(findPaginatedProductDto.orderBy)
      .limit(1);

    const paginatedProducts = await this.productService
      .find(filter)
      .populate(['shopId', 'saleId'])
      .sort(findPaginatedProductDto.orderBy)
      .limit(findPaginatedProductDto?.limit);

    return {
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
