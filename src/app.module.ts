import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenvConfig from 'dotenv';
import { CategoryModule } from './Components/Categories/category.module';
import { SaleModule } from './Components/Sales/sale.module';
import { BrandModule } from './Components/Brands/brand.module';
import { ShopModule } from './Components/Shops/shop.module';
import { ProductModule } from './Components/Products/product.module';
import { AccountModule } from './Components/Accounts/account.module';
import { BagModule } from './Components/Bags/bag.module';
import { BillModule } from './Components/Bills/bill.module';

dotenvConfig.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CategoryModule,
    SaleModule,
    BrandModule,
    ShopModule,
    ProductModule,
    AccountModule,
    BagModule,
    BillModule,
  ],
})
export class AppModule {}
