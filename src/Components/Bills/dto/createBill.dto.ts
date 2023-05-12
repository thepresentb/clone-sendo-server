import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateBillDto {
  @IsOptional()
  paymentMethodId: ObjectId;

  @IsOptional()
  shipMethodId: ObjectId;

  @IsNumber()
  shipPrice: number;

  @IsString()
  notification: string;

  @IsOptional()
  detail: [
    {
      productId: ObjectId;
      quantity: number;
      price: number;
    },
  ];
}
