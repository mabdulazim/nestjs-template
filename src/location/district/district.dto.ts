import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDistrictDto {
  @IsNumber()
  @IsNotEmpty()
  cityId: number;

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

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}

export class FilterDistrictDto {
  @IsOptional()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsNumber()
  cityId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
