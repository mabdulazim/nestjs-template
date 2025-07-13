import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import {
  RegisterEmailDto,
  RegisterMobileDto,
  RegisterMobile2FADto,
  RegisterEmail2FADto,
} from '../dto/register.dto';

@Controller('auth/register')
// @Controller({ path: 'auth/register', version: '1' })
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('email')
  registerWithEmail(@Body() dto: RegisterEmailDto) {
    return this.registerService.registerWithEmail(dto);
  }

  @Post('email/2fa')
  registerWithEmail2FA(@Body() dto: RegisterEmail2FADto) {
    return this.registerService.registerWithEmail2FA(dto);
  }

  @Post('mobile')
  registerWithMobile(@Body() dto: RegisterMobileDto) {
    return this.registerService.registerWithMobile(dto);
  }

  @Post('mobile/2fa')
  registerWithMobile2FA(@Body() dto: RegisterMobile2FADto) {
    return this.registerService.registerWithMobile2FA(dto);
  }
}
