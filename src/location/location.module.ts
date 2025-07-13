import { Module } from '@nestjs/common';
import { StoreModule } from './store/store.module';
import { CityModule } from './city/city.module';
import { DistrictModule } from './district/district.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [StoreModule, CityModule, DistrictModule, BranchModule],
  exports: [StoreModule, CityModule, DistrictModule, BranchModule],
})
export class LocationModule {}
