import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { ResponsePayload } from 'src/Utils/ResponsePayload';
import { ResponseBuilder } from 'src/Utils/ResponseBuilder';
import { ResponseCodeEnum } from 'src/constant/responseCode.enum';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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

  // @Get('popu')
  // async findPopu() {
  //   return this.productService.findPopulate();
  // }
}
