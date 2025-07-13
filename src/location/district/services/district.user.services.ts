import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from '../district.entity';
import { TenantBaseService } from 'src/common/services/tenant.service';

@Injectable()
export class DistrictService extends TenantBaseService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepo: Repository<District>,
  ) {
    super();
  }

  async findAll(cityId: number): Promise<District[]> {
    const districs = await this.districtRepo.find({
      where: { storeId: this.storeId, cityId, isActive: true },
      order: { id: 'DESC' },
    });
    return districs;
  }

  async findOne(id: number): Promise<District> {
    const distric = await this.districtRepo.findOne({
      where: { id, storeId: this.storeId, isActive: true },
    });

    if (!distric) throw new NotFoundException('District not found');

    return distric;
  }
}
