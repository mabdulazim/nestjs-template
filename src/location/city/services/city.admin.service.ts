import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../city.entity';
import { CreateCityDto, UpdateCityDto, FilterCityDto } from '../city.dto';
import { TenantBaseService } from 'src/common/services/tenant.service';
import { Pagination } from 'src/common/interfaces/pagination.interface';

@Injectable()
export class CityService extends TenantBaseService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {
    super();
  }

  async findAll(filterDto: FilterCityDto): Promise<Pagination<City>> {
    const { page = 1, limit = 10 } = filterDto;
    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.cityRepo.findAndCount({
      where: { storeId: this.storeId },
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      currentPage: page,
      totalPages,
      totalItems,
    };
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepo.findOne({
      where: { id, storeId: this.storeId },
    });

    if (!city) throw new NotFoundException('City not found');

    return city;
  }

  async createCity(data: CreateCityDto): Promise<City> {
    const city = this.cityRepo.create({ ...data, storeId: this.storeId });
    return this.cityRepo.save(city);
  }

  async updateCity(id: number, data: UpdateCityDto): Promise<City> {
    const city = await this.findOne(id);
    const updated = this.cityRepo.merge(city, data);
    return this.cityRepo.save(updated);
  }

  async deleteCity(id: number): Promise<void> {
    const city = await this.findOne(id);
    await this.cityRepo.softRemove(city);
  }
}
