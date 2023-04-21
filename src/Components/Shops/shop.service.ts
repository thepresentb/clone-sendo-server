import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/Base/AbstractService.base';
import { Shop } from './Schemas/shop.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ShopService extends BaseService<Shop> {
  constructor(@InjectModel(Shop.name) private shopService: Model<Shop>) {
    super(shopService);
  }
}
