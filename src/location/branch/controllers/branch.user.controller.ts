import { Controller, Get, Query } from '@nestjs/common';
import { BranchService as BranchUserService } from '../services/branch.user.service';
import { BranchFilterDto } from '../branch.dto';

@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchUserService) {}

  @Get()
  async getBranches(@Query() filterDto: BranchFilterDto) {
    return this.branchService.findAll(filterDto);
  }
}
