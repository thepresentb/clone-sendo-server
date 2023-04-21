import { IsString } from 'class-validator';

export class CreateShopDto {
  @IsString()
  private name: string;

  @IsString()
  private code: string;

  @IsString()
  private address: string;
}
