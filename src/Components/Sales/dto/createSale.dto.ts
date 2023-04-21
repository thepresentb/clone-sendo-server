import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateSaleDto {
  @IsInt()
  @Min(0)
  @Max(100)
  private salePercent: number;

  @IsBoolean()
  private saleStatus: number;

  @IsDateString()
  private startAt: Date;

  @IsDateString()
  private endAt: Date;

  @IsOptional()
  private productId: mongoose.Types.ObjectId;
}
