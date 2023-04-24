import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { ResponsePayload } from 'src/Utils/ResponsePayload';
import { ResponseBuilder } from 'src/Utils/ResponseBuilder';
import { ResponseCodeEnum } from 'src/constant/responseCode.enum';
import { SaleService } from '../Sales/sale.service';
import { Sale } from '../Sales/Schemas/sale.schema';
import { Product } from './Schemas/product.schema';
import { FindPaginatedProductDto } from './dto/findPaginatedProduct.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly saleService: SaleService,
  ) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ResponsePayload> {
    try {
      const result = await this.productService.create(createProductDto);
      return new ResponseBuilder(result).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }

  @Get('flash_sale')
  async findFlashSale(): Promise<ResponsePayload> {
    const saleList: Sale[] = await this.saleService.findSaleActive();
    let result: Product[] = [];
    for (const sale of saleList) {
      const productList = await this.productService.findWithPopulate(
        { saleId: sale._id },
        ['saleId'],
      );
      if (result.length >= 10) {
        result = productList.slice(0, 10);
        break;
      } else {
        result = [...productList];
      }
    }
    return new ResponseBuilder(result).build();
  }

  @Post('paginate')
  async findPaginatedProducts(
    @Body() findPaginatedProductDto: FindPaginatedProductDto,
  ) {
    try {
      const result = await this.productService.findPaginatedProducts(
        findPaginatedProductDto,
      );
      return new ResponseBuilder(result).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }

  // @Get('popu')
  // async findPopu() {
  //   return this.productService.findWithPopulate();
  // }
}
