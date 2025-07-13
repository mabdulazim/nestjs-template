import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../branch.entity';
import { BranchFilterDto } from '../branch.dto';
import { TenantBaseService } from 'src/common/services/tenant.service';
import { Pagination } from 'src/common/interfaces/pagination.interface';

@Injectable()
export class BranchService extends TenantBaseService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepo: Repository<Branch>,
  ) {
    super();
  }

  async findAll(filterDto: BranchFilterDto): Promise<Pagination<Branch>> {
    const { page, limit, cityId, districtId } = filterDto;
    const skip = (page - 1) * limit;

    const where: Partial<Branch> = { storeId: this.storeId, isActive: true };
    if (cityId) where.cityId = cityId;
    if (districtId) where.districtId = districtId;

    const [data, totalItems] = await this.branchRepo.findAndCount({
      where,
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

  async findOne(id: number): Promise<Branch> {
    const branch = await this.branchRepo.findOne({
      where: { id, storeId: this.storeId, isActive: true },
    });

    if (!branch) throw new NotFoundException('Branch not found');

    return branch;
  }
}
