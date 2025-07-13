import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../branch.entity';
import {
  CreateBranchDto,
  UpdateBranchDto,
  BranchFilterDto,
} from '../branch.dto';
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
    const { page = 1, limit = 10, cityId, districtId } = filterDto;
    const skip = (page - 1) * limit;

    const where: any = { storeId: this.storeId };
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
      where: { id, storeId: this.storeId },
    });

    if (!branch) throw new NotFoundException('Branch not found');

    return branch;
  }

  async createBranch(data: CreateBranchDto): Promise<Branch> {
    console.log('data', data);
    const branch = this.branchRepo.create({ ...data, storeId: this.storeId });
    return this.branchRepo.save(branch);
  }

  async updateBranch(id: number, data: UpdateBranchDto): Promise<Branch> {
    const branch = await this.findOne(id);

    const updated = this.branchRepo.merge(branch, data);
    return this.branchRepo.save(updated);
  }

  async deleteBranch(id: number): Promise<void> {
    const branch = await this.findOne(id);
    await this.branchRepo.softRemove(branch);
  }
}
