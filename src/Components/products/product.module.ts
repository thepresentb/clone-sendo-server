import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from './Schemas/sale.schema';
import { ProductController } from './product.controller';
import { SaleService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sale.name, schema: SaleSchema },
      { name: Sale.name, schema: SaleSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [SaleService],
})
export class ProductModule {}
