import { Controller, Get, Param } from '@nestjs/common';
import { DistrictService } from '../services/district.user.services';

@Controller('cities/:cityId/districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  async getDistricts(@Param('cityId') cityId: number) {
    return this.districtService.findAll(cityId);
  }
}
