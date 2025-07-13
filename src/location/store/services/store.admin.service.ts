import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../store.entity';
import { CreateStoreDto, UpdateStoreDto, StoreFilterDto } from '../store.dto';
import { TenantBaseService } from 'src/common/services/tenant.service';
import { Pagination } from 'src/common/interfaces/pagination.interface';

@Injectable()
export class StoreService extends TenantBaseService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,
  ) {
    super();
  }

  async findAll(filterDto: StoreFilterDto): Promise<Pagination<Store>> {
    const { page = 1, limit = 10 } = filterDto;
    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.storeRepo.findAndCount({
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

  async findOne(id: number): Promise<Store> {
    const store = await this.storeRepo.findOne({
      where: { id },
    });

    if (!store) throw new NotFoundException('Store not found');
    return store;
  }

  async createStore(data: CreateStoreDto): Promise<Store> {
    const store = this.storeRepo.create({ ...data });
    return this.storeRepo.save(store);
  }

  async updateStore(id: number, data: UpdateStoreDto): Promise<Store> {
    const store = await this.findOne(id);
    const updated = this.storeRepo.merge(store, data);
    return this.storeRepo.save(updated);
  }

  async deleteStore(id: number): Promise<void> {
    const store = await this.findOne(id);
    await this.storeRepo.softRemove(store);
  }
}
