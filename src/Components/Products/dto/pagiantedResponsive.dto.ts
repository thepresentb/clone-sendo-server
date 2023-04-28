import { Product } from '../Schemas/product.schema';

export class PaginatedProductDto {
  readonly total: number;
  readonly cursor: Date;
  readonly hasMore: boolean;
  readonly paginatedProducts: Product[];
}
