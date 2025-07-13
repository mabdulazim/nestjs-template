import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreController as StoreAdminController } from './controllers/store.admin.controller';
import { StoreService as StoreAdminService } from './services/store.admin.service';
import { Store } from './store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [StoreAdminController],
  providers: [StoreAdminService],
  exports: [StoreAdminService],
})
export class StoreModule {}
