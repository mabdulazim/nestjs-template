import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import {
  LoginMobileDto,
  LoginEmailDto,
  LoginMobile2FADto,
} from '../dto/login.dto';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('email')
  loginWithEmail(@Body() dto: LoginEmailDto) {
    return this.loginService.loginWithEmail(dto);
  }

  @Post('mobile')
  @HttpCode(HttpStatus.OK)
  async loginWithMobile(@Body() dto: LoginMobileDto) {
    return await this.loginService.loginWithMobile(dto);
  }

  @Post('mobile/2fa')
  loginWithMobile2FA(@Body() dto: LoginMobile2FADto) {
    return this.loginService.loginWithMobile2FA(dto);
  }
}
