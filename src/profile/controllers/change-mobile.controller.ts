import { Controller, Post, Body } from '@nestjs/common';
import { ChangeMobileDto, ValidateOTPDto } from '../dto/change-mobile.dto';
import { ChangeMobileService } from '../services/change-mobile.service';

@Controller('profile/change-mobile')
export class ChangeMobileController {
  constructor(private readonly changeMobileService: ChangeMobileService) {}

  @Post('')
  initiateChangeMobile(@Body() dto: ChangeMobileDto) {
    return this.changeMobileService.changeMobile(dto);
  }

  @Post('validate')
  async validateChangeMobile(@Body() dto: ValidateOTPDto) {
    return await this.changeMobileService.validateOTP(dto);
  }
}
