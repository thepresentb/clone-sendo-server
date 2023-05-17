import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class EditAddressDto {
  @IsString()
  _id: ObjectId;

  @IsString()
  accountId: ObjectId;

  @IsString()
  receiver: string;

  @IsString()
  phoneNumber: string;

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

  @IsString()
  wardCode: string;

  @IsString()
  homeAddress: string;

  @IsOptional()
  @IsBoolean()
  isDefault: boolean;
}
