import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  nameAr: string;

  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

export class UpdateStoreDto extends PartialType(CreateStoreDto) {}

export class StoreFilterDto {
  @IsOptional()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
