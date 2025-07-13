import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../city.entity';
import { TenantBaseService } from 'src/common/services/tenant.service';

@Injectable()
export class CityService extends TenantBaseService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {
    super();
  }

  async findAll(): Promise<City[]> {
    const cities = await this.cityRepo.find({
      where: { storeId: this.storeId, isActive: true },
      order: { id: 'DESC' },
    });
    return cities;
  }
}
