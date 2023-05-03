import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/Base/AbstractService.base';
import { Product } from './Schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FindPaginatedProductDto } from './dto/findPaginatedProduct.dto';
import { PaginatedProductDto } from './dto/pagiantedResponsive.dto';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectModel(Product.name) private productService: Model<Product>,
  ) {
    super(productService);
  }

  async findProductById(id: ObjectId): Promise<Product> {
    const product = await this.productService.find({ _id: id }).populate([
      {
        path: 'categoryDetailId',
        populate: {
          path: 'categoryId',
        },
      },
      {
        path: 'saleId',
      },
      {
        path: 'shopId',
      },
      {
        path: 'brandId',
      },
    ]);
    return product.length > 0 ? product[0] : null;
  }

  async findWithPopulate(filter: any, fields: string[]): Promise<Product[]> {
    return await this.productService.find(filter).populate(fields);
  }

  async findPaginatedProducts(
    findPaginatedProductDto: FindPaginatedProductDto,
  ): Promise<PaginatedProductDto> {
    if (findPaginatedProductDto?.filter?.name) {
      findPaginatedProductDto.filter.name = new RegExp(
        findPaginatedProductDto.filter.name,
        'i',
      );
    }

    const sortLastProduct = findPaginatedProductDto?.orderBy
      ? JSON.parse(JSON.stringify(findPaginatedProductDto.orderBy))
      : { createdAt: -1 };

    // reverse order by to get last product
    Object.keys(sortLastProduct).forEach(
      (key) => (sortLastProduct[key] = -sortLastProduct[key]),
    );

    const total = await this.productService
      .count(findPaginatedProductDto.filter)
      .sort(findPaginatedProductDto.orderBy);

    const lastProduct = await this.productService
      .find(findPaginatedProductDto.filter)
      .sort(sortLastProduct)
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
