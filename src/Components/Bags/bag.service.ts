import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/Base/AbstractService.base';
import { InjectModel } from '@nestjs/mongoose';
import { Bag } from './Schemas/bag.schema';
import { Model } from 'mongoose';

@Injectable()
export class BagService extends BaseService<Bag> {
  constructor(@InjectModel(Bag.name) private bagModel: Model<Bag>) {
    super(bagModel);
  }
}
