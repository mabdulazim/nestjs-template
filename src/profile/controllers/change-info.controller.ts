import { Controller, Body, Put } from '@nestjs/common';
import { ChangeInfoDto } from '../dto/change-info.dto';
import { ChangeInfoService } from '../services/change-info.service';

@Controller('profile/change-info')
export class ChangeInfoController {
  constructor(private readonly changeInfoService: ChangeInfoService) {}

  @Put('')
  initiateChangeMobile(@Body() dto: ChangeInfoDto) {
    return this.changeInfoService.changeInfo(dto);
  }
}
