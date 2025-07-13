import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from '../district.entity';
import {
  CreateDistrictDto,
  UpdateDistrictDto,
  FilterDistrictDto,
} from '../district.dto';
import { TenantBaseService } from 'src/common/services/tenant.service';
import { Pagination } from 'src/common/interfaces/pagination.interface';

@Injectable()
export class DistrictService extends TenantBaseService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepo: Repository<District>,
  ) {
    super();
  }

  async findAll(filterDto: FilterDistrictDto): Promise<Pagination<District>> {
    const { page = 1, limit = 10, cityId } = filterDto;
    const skip = (page - 1) * limit;

    const where: Partial<District> = { storeId: this.storeId };
    if (cityId) where.cityId = cityId;

    const [data, totalItems] = await this.districtRepo.findAndCount({
      where,
      skip,
      take: limit,
      relations: ['city'],
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

  async findOne(id: number): Promise<District> {
    const distric = await this.districtRepo.findOne({
      where: { id, storeId: this.storeId },
    });

    if (!distric) throw new NotFoundException('District not found');

    return distric;
  }

  async createDistrict(data: CreateDistrictDto): Promise<District> {
    const distric = this.districtRepo.create({
      ...data,
      storeId: this.storeId,
    });
    return this.districtRepo.save(distric);
  }

  async updateDistric(id: number, data: UpdateDistrictDto): Promise<District> {
    const distric = await this.findOne(id);

    const updated = this.districtRepo.merge(distric, data);
    return this.districtRepo.save(updated);
  }

  async deleteDistric(id: number): Promise<void> {
    const distric = await this.findOne(id);
    await this.districtRepo.softRemove(distric);
  }
}
