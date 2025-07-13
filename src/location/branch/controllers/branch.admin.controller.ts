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
import { BranchService } from '../services/branch.admin.service';
import {
  CreateBranchDto,
  UpdateBranchDto,
  BranchFilterDto,
} from '../branch.dto';

@Controller('admin/branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  async getBranches(@Query() filterDto: BranchFilterDto) {
    return this.branchService.findAll(filterDto);
  }

  @Post()
  async createBranch(@Body() dto: CreateBranchDto) {
    return this.branchService.createBranch(dto);
  }

  @Put(':id')
  updateBranch(@Param('id') brandhId: number, @Body() dto: UpdateBranchDto) {
    return this.branchService.updateBranch(brandhId, dto);
  }

  @Delete(':id')
  deleteBranch(@Param('id') brandhId: number) {
    return this.branchService.deleteBranch(brandhId);
  }
}
