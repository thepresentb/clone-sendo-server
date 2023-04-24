import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './Schemas/product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SaleService } from '../Sales/sale.service';
import { Sale, SaleSchema } from '../Sales/Schemas/sale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Sale.name, schema: SaleSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, SaleService],
})
export class ProductModule {}
