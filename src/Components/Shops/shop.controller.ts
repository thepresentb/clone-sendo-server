import { Controller, Post, Body } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/createShop.dto';
import { ResponsePayload } from 'src/Utils/ResponsePayload';
import { ResponseBuilder } from 'src/Utils/ResponseBuilder';
import { ResponseCodeEnum } from 'src/constant/responseCode.enum';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto): Promise<ResponsePayload> {
    try {
      const result = await this.shopService.create(createShopDto);
      return new ResponseBuilder(result).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }
}
