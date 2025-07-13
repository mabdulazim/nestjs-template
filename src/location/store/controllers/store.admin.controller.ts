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
import { StoreService } from '../services/store.admin.service';
import { CreateStoreDto, UpdateStoreDto, StoreFilterDto } from '../store.dto';

@Controller('admin/stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async getStores(@Query() filterDto: StoreFilterDto) {
    return this.storeService.findAll(filterDto);
  }

  @Post()
  async createStore(@Body() dto: CreateStoreDto) {
    return this.storeService.createStore(dto);
  }

  @Put(':id')
  updateStore(@Param('id') storeId: number, @Body() dto: UpdateStoreDto) {
    return this.storeService.updateStore(storeId, dto);
  }

  @Delete(':id')
  detelteStore(@Param('id') storeId: number) {
    return this.storeService.deleteStore(storeId);
  }
}
