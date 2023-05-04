import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bag, BagSchema } from './Schemas/bag.schema';
import { BagController } from './bag.controller';
import { BagService } from './bag.service';
import { AccountService } from '../Accounts/account.service';
import { ProductService } from '../Products/product.service';
import { AccountModule } from '../Accounts/account.module';
import { ProductModule } from '../Products/product.module';
import { Account, AccountSchema } from '../Accounts/Schemas/account.schema';
import { Product, ProductSchema } from '../Products/Schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bag.name, schema: BagSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [BagController],
  providers: [BagService, AccountService, ProductService],
})
export class BagModule {}
