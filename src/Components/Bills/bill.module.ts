import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './Schemas/Bill.schema';
import { BillDetail, BillDetailSchema } from './Schemas/BillDetail.schema';
import { BillStatus, BillStatusSchema } from './Schemas/BillStatus.schema';
import {
  PaymentMethod,
  PaymentMethodSchema,
} from './Schemas/PaymentMethod.schema';
import { ShipMethod, ShipMethodSchema } from './Schemas/ShipMethod.schema';
import {
  BillDetailService,
  BillService,
  BillStatusService,
  PaymentMethodService,
  ShipMethodService,
} from './bill.service';
import { BillController } from './bill.controller';
import { ProductService } from '../Products/product.service';
import { Product, ProductSchema } from '../Products/Schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bill.name, schema: BillSchema },
      { name: BillDetail.name, schema: BillDetailSchema },
      { name: BillStatus.name, schema: BillStatusSchema },
      { name: PaymentMethod.name, schema: PaymentMethodSchema },
      { name: ShipMethod.name, schema: ShipMethodSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [BillController],
  providers: [
    BillService,
    BillStatusService,
    BillDetailService,
    PaymentMethodService,
    ShipMethodService,
    ProductService,
  ],
})
export class BillModule {}
