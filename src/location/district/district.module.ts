import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictController as DistrictAdminController } from './controllers/district.admin.controller';
import { DistrictController as DistrictUserController } from './controllers/district.user.controller';
import { DistrictService as DistrictAdminService } from './services/district.admin.services';
import { DistrictService as DistrictUserService } from './services/district.user.services';
import { District } from './district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  controllers: [DistrictAdminController, DistrictUserController],
  providers: [DistrictAdminService, DistrictUserService],
  exports: [],
})
export class DistrictModule {}
