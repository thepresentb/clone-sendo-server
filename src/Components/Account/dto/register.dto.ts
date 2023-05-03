import { IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class RegisterDto {
  @IsString()
  public username: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsOptional()
  public roleId: ObjectId;
}
