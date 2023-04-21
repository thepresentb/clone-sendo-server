import { Body, Controller, Post } from '@nestjs/common';
import { SaleService } from './product.service';
import { ResponseBuilder } from 'src/Utils/ResponseBuilder';
import { ResponseCodeEnum } from 'src/constant/responseCode.enum';
import { ResponsePayload } from 'src/Utils/ResponsePayload';
import { CreateSaleDto } from './dto/createSale.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly saleService: SaleService) {}

  @Post('sales')
  async create(@Body() createSaleDto: CreateSaleDto): Promise<ResponsePayload> {
    try {
      const result = await this.saleService.create(createSaleDto);
      return new ResponseBuilder(result).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }

  // @Get(':id')
  // async findOneById(@Param('id') id: string): Promise<ResponsePayload> {
  //   try {
  //     const result = await this.categoryDetailService.findOne({ _id: id });
  //     return new ResponseBuilder(result).build();
  //   } catch (err) {
  //     return new ResponseBuilder()
  //       .withCode(ResponseCodeEnum.BAD_REQUEST)
  //       .withMessage(err.message)
  //       .build();
  //   }
  // }
}
