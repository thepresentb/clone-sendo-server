import { ProductService } from './../Products/product.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateBillDto } from './dto/createBill.dto';
import {
  BillDetailService,
  BillService,
  BillStatusService,
  PaymentMethodService,
  ShipMethodService,
} from './bill.service';
import { ResponseBuilder } from 'src/Utils/ResponseBuilder';
import { ResponseCodeEnum } from 'src/constant/responseCode.enum';
import { ErrorMessageEnum } from 'src/constant/errorMessage.enum';

@Controller('bills')
export class BillController {
  constructor(
    private readonly billService: BillService,
    private readonly billDetailService: BillDetailService,
    private readonly BillStatusService: BillStatusService,
    private readonly productService: ProductService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly shipMethodService: ShipMethodService,
  ) {}

  @Post('create')
  async createBill(@Body() createBillDto: CreateBillDto) {
    try {
      console.log(createBillDto);
      if (
        !(await this.paymentMethodService.findOne({
          _id: createBillDto.paymentMethodId,
        }))
      ) {
        return new ResponseBuilder()
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .withMessage('paymentMethodId not found')
          .build();
      }

      if (
        !(await this.shipMethodService.findOne({
          _id: createBillDto.shipMethodId,
        }))
      ) {
        return new ResponseBuilder()
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .withMessage('shipMethodId not found')
          .build();
      }

      for (let i = 0; i < createBillDto.detail.length; i++) {
        const product = await this.productService.findOne({
          _id: createBillDto.detail[i].productId,
        });
        if (!product) {
          return new ResponseBuilder()
            .withCode(ResponseCodeEnum.BAD_REQUEST)
            .withMessage('productId not found')
            .build();
        }

        if (product.quantity < createBillDto.detail[i].quantity) {
          return new ResponseBuilder()
            .withCode(ResponseCodeEnum.BAD_REQUEST)
            .withMessage('quantity not enough')
            .build();
        }
      }
    } catch (err) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(err.message)
        .build();
    }
  }
}
