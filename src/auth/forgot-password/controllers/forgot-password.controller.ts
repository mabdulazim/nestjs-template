import { Controller, Post, Body } from '@nestjs/common';
import { ForgotPasswordService } from '../services/forgot-password.service';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  ValidateOTPDto,
} from '../dto/forgot-password.dto';

@Controller('auth/forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post('')
  loginWithEmail(@Body() dto: ForgotPasswordDto) {
    return this.forgotPasswordService.forgotPassword(dto);
  }

  @Post('validate')
  async loginWithMobile(@Body() dto: ValidateOTPDto) {
    return await this.forgotPasswordService.validateOTP(dto);
  }

  @Post('change')
  loginWithMobile2FA(@Body() dto: ChangePasswordDto) {
    return this.forgotPasswordService.changePassword(dto);
  }
}
