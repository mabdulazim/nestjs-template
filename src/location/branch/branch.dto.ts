import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  Matches,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateBranchDto {
  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @IsNumber()
  @IsNotEmpty()
  districtId: number;

  // @IsString()
  // @IsNotEmpty()
  // nameAr: string;

  // @IsString()
  // @IsNotEmpty()
  // nameEn: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in HH:mm format',
  })
  opensFrom: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in HH:mm format',
  })
  opensTo: string;

  @IsString()
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  lng: string;

  @IsString()
  @IsOptional()
  mobile?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateBranchDto extends PartialType(CreateBranchDto) {}

export class BranchFilterDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cityId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  districtId?: number;
}
