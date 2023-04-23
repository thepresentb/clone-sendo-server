import { Controller, Post, Get, Body } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/createBrand.dto';
import { ResponsePayload } from 'src/Utils/ResponsePayload';
import { ResponseBuilder } from 'src/Utils/ResponseBuilder';
import { ResponseCodeEnum } from 'src/constant/responseCode.enum';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(
    @Body() createBrandDto: CreateBrandDto,
  ): Promise<ResponsePayload> {
    try {
      const result = await this.brandService.create(createBrandDto);
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
      const result = await this.brandService.findAll();
      return new ResponseBuilder(result).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }
}
