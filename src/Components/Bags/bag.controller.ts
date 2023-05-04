import { BagService } from './bag.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateBagDto } from './dto/createBag.dto';
import { ResponseBuilder } from 'src/Utils/ResponseBuilder';
import { ResponseCodeEnum } from 'src/constant/responseCode.enum';
import { AccountService } from '../Accounts/account.service';
import { ProductService } from '../Products/product.service';
import { ObjectId } from 'mongoose';

@Controller('bags')
export class BagController {
  constructor(
    private readonly bagService: BagService,
    private readonly accountService: AccountService,
    private readonly productService: ProductService,
  ) {}

  @Post('create')
  async createBag(@Body() createBagDto: CreateBagDto) {
    try {
      if (
        !(await this.accountService.findOne({ _id: createBagDto.accountId }))
      ) {
        return new ResponseBuilder()
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .withMessage('accountId not found')
          .build();
      }
      if (
        !(await this.productService.findOne({ _id: createBagDto.productId }))
      ) {
        return new ResponseBuilder()
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .withMessage('productId not found')
          .build();
      }

      const result = await this.bagService.create(createBagDto);
      return new ResponseBuilder(result).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }

  @Post('find_all_by_accountId')
  async findAllByAccountId(@Body() { accountId }: { accountId: ObjectId }) {
    try {
      if (!(await this.accountService.findOne({ _id: accountId }))) {
        return new ResponseBuilder()
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .withMessage('accountId not found')
          .build();
      }

      const result = await this.bagService.find({
        accountId,
      });
      return new ResponseBuilder(result).build();
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }
}
