import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/Base/AbstractService.base';
import { Bill } from './Schemas/Bill.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BillDetail } from './Schemas/BillDetail.schema';
import { BillStatus } from './Schemas/BillStatus.schema';
import { PaymentMethod } from './Schemas/PaymentMethod.schema';
import { ShipMethod } from './Schemas/ShipMethod.schema';

@Injectable()
export class BillService extends BaseService<Bill> {
  constructor(@InjectModel(Bill.name) private billModel: Model<Bill>) {
    super(billModel);
  }
}

@Injectable()
export class BillDetailService extends BaseService<BillDetail> {
  constructor(
    @InjectModel(BillDetail.name) private billDetailModel: Model<BillDetail>,
  ) {
    super(billDetailModel);
  }
}

@Injectable()
export class BillStatusService extends BaseService<BillStatus> {
  constructor(
    @InjectModel(BillStatus.name) private billStatusModel: Model<BillStatus>,
  ) {
    super(billStatusModel);
  }
}

@Injectable()
export class PaymentMethodService extends BaseService<PaymentMethod> {
  constructor(
    @InjectModel(PaymentMethod.name)
    private paymentMethodModel: Model<PaymentMethod>,
  ) {
    super(paymentMethodModel);
  }
}

@Injectable()
export class ShipMethodService extends BaseService<ShipMethod> {
  constructor(
    @InjectModel(ShipMethod.name) private shipMethodModel: Model<ShipMethod>,
  ) {
    super(shipMethodModel);
  }
}
