import { Body, Controller, Post, Get } from '@nestjs/common';
import { ResponseBuilder } from 'src/Utils/ResponseBuilder';
import { ResponseCodeEnum } from 'src/constant/responseCode.enum';
import { ResponsePayload } from 'src/Utils/ResponsePayload';
import { CreateSaleDto } from './dto/createSale.dto';
import { SaleService } from './sale.service';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
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

  @Get()
  async findAll() {
    try {
      const result = await this.saleService.findAll();
      return new ResponseBuilder(result).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }
}
