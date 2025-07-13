import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController as CityAdminController } from './controllers/city.admin.controller';
import { CityController as CityUserController } from './controllers/city.user.controller';
import { CityService as CityAdminService } from './services/city.admin.service';
import { CityService as CityUserService } from './services/city.user.service';
import { City } from './city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CityAdminController, CityUserController],
  providers: [CityAdminService, CityUserService],
  exports: [],
})
export class CityModule {}
