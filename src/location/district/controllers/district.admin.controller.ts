import {
  Controller,
  Body,
  Put,
  Param,
  Get,
  Query,
  Post,
  Delete,
} from '@nestjs/common';
import { DistrictService } from '../services/district.admin.services';
import {
  CreateDistrictDto,
  UpdateDistrictDto,
  FilterDistrictDto,
} from '../district.dto';

@Controller('admin/districts')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  async getDistricts(@Query() filterDto: FilterDistrictDto) {
    return this.districtService.findAll(filterDto);
  }

  @Post()
  async createDistrict(@Body() dto: CreateDistrictDto) {
    return this.districtService.createDistrict(dto);
  }

  @Put(':id')
  updateDistrict(
    @Param('id') districtId: number,
    @Body() dto: UpdateDistrictDto,
  ) {
    return this.districtService.updateDistric(districtId, dto);
  }

  @Delete(':id')
  detelteDistrict(@Param('id') districtId: number) {
    return this.districtService.deleteDistric(districtId);
  }
}
