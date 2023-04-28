import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { ObjectId, SortOrder } from 'mongoose';

export class FindPaginatedProductDto {
  @IsOptional()
  public filter: {
    name?: RegExp;
    isInstallment?: boolean;
    isExpressDelivery?: boolean;
    price?: {
      $gte: number;
      $lte: number;
    };
    rate?: {
      $gte: number;
      $lte?: number;
    };
    categoryDetailId?: ObjectId;
    createdAt?: {
      $lt: Date;
    };
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
