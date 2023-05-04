import { IsNumber, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateBagDto {
  @IsOptional()
  public accountId: ObjectId;

  @IsOptional()
  public productId: ObjectId;

  @IsNumber()
  public quantity: number;
}
