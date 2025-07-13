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
import { CityService } from '../services/city.admin.service';
import { CreateCityDto, UpdateCityDto, FilterCityDto } from '../city.dto';

@Controller('admin/cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getCities(@Query() filterDto: FilterCityDto) {
    return this.cityService.findAll(filterDto);
  }

  @Post()
  async createCity(@Body() dto: CreateCityDto) {
    return this.cityService.createCity(dto);
  }

  @Put(':id')
  updateCity(@Param('id') cityId: number, @Body() dto: UpdateCityDto) {
    return this.cityService.updateCity(cityId, dto);
  }

  @Delete(':id')
  detelteCity(@Param('id') cityId: number) {
    return this.cityService.deleteCity(cityId);
  }
}
