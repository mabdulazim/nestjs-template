import { Controller, Get } from '@nestjs/common';
import { CityService } from '../services/city.user.service';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getCities() {
    return this.cityService.findAll();
  }
}
