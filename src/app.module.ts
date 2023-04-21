import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenvConfig from 'dotenv';
import { CategoryModule } from './Components/Categories/category.module';
import { SaleModule } from './Components/Sales/sale.module';
// import { ProductModule } from './Components/products/product.module';

dotenvConfig.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CategoryModule,
    SaleModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
