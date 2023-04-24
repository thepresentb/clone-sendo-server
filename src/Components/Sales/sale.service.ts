import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/Base/AbstractService.base';
import { Sale } from './Schemas/sale.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SaleService extends BaseService<Sale> {
  constructor(@InjectModel(Sale.name) private saleModel: Model<Sale>) {
    super(saleModel);
  }

  public async findSaleActive(): Promise<Sale[]> {
    const saleList: Sale[] = await this.saleModel.find({
      saleStatus: true,
      startAt: {
        $lte: new Date(),
      },
      endAt: {
        $gte: new Date(),
      },
    });
    return saleList;
  }
}
