import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import mongoose, { SortOrder } from 'mongoose';

export class FindPaginatedProductDto {
  @IsOptional()
  public filter: {
    name?: string;
    isInstallment?: boolean;
    isExpressDelivery?: boolean;
    price?: number[];
    rate?: number[];
    saleId?: mongoose.Types.ObjectId;
    createdAt?: Date;
  };

  @IsNumber()
  @Max(50)
  @Min(1)
  public limit: number;

  @IsOptional()
  public orderBy: {
    createdAt?: SortOrder;
    rate?: SortOrder;
    price?: SortOrder;
  };
}
