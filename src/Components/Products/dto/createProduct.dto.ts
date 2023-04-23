import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsString()
  public imgUrl: string;

  @IsOptional()
  @IsBoolean()
  public isInstallment?: boolean;

  @IsOptional()
  @IsBoolean()
  public isExpressDelivery?: boolean;

  @IsNumber()
  public quantity: number;

  @IsNumber()
  public total: number;

  @IsNumber()
  public price: number;

  @IsNumber()
  public rate: number;

  @IsOptional()
  public categoryDetailId: mongoose.Types.ObjectId;

  @IsOptional()
  public shopId: mongoose.Types.ObjectId;

  @IsOptional()
  public brandId: mongoose.Types.ObjectId;

  @IsOptional()
  public saleId?: mongoose.Types.ObjectId;
}
