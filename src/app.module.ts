import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenvConfig from 'dotenv';
import { CategoryModule } from './Components/Categories/category.module';

dotenvConfig.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), CategoryModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
