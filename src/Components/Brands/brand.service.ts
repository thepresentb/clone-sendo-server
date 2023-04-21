import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/Base/AbstractService.base';
import { Brand } from './Schemas/brand.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandService extends BaseService<Brand> {
  constructor(@InjectModel(Brand.name) private brandService: Model<Brand>) {
    super(brandService);
  }
}
