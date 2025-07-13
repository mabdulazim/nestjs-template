import { Controller, Post, Body } from '@nestjs/common';
import { ChangeEmailDto, ValidateOTPDto } from '../dto/change-email.dto';
import { ChangeEmailService } from '../services/change-email.service';

@Controller('profile/change-email')
export class ChangeEmailController {
  constructor(private readonly changeEmailService: ChangeEmailService) {}

  @Post('')
  initiateChangeMobile(@Body() dto: ChangeEmailDto) {
    return this.changeEmailService.changeEmail(dto);
  }

  @Post('validate')
  async validateChangeMobile(@Body() dto: ValidateOTPDto) {
    return await this.changeEmailService.validateOTP(dto);
  }
}
