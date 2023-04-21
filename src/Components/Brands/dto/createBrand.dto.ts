import { IsString } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  private name: string;

  @IsString()
  private code: string;
}
