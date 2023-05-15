import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateAddressDto {
  @IsString()
  accountId: ObjectId;

  @IsString()
  provinceName: string;

  @IsNumber()
  provinceId: number;

  @IsString()
  districtName: string;

  @IsNumber()
  districtId: number;

  @IsString()
  wardName: string;

  @IsNumber()
  wardCode: number;

  @IsOptional()
  @IsBoolean()
  isDefault: boolean;
}
