import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateCityDto {
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

export class UpdateCityDto extends PartialType(CreateCityDto) {}

export class FilterCityDto {
  @IsOptional()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
