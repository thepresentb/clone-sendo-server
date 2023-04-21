import {
  IsBoolean,
  IsDateString,
  IsInt,
  Length,
  Max,
  Min,
} from 'class-validator';

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
}
