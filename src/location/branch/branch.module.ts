import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchController as BranchAdminController } from './controllers/branch.admin.controller';
import { BranchController as BranchUserController } from './controllers/branch.user.controller';
import { BranchService as BranchAdminService } from './services/branch.admin.service';
import { BranchService as BranchUserService } from './services/branch.user.service';
import { Branch } from './branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  controllers: [BranchAdminController, BranchUserController],
  providers: [BranchAdminService, BranchUserService],
  exports: [],
})
export class BranchModule {}
