import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import {
  LoginMobileDto,
  LoginEmailDto,
  RegisterEmailDto,
  RegisterMobileDto,
  LoginMobile2FADto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/email')
  loginWithEmail(@Body() dto: LoginEmailDto) {
    return this.authService.loginWithEmail(dto);
  }

  @Post('login/mobile')
  @HttpCode(HttpStatus.OK)
  async loginWithMobile(@Body() dto: LoginMobileDto) {
    return await this.authService.loginWithMobile(dto);
  }

  @Post('login/mobile/2fa')
  loginWithMobile2FA(@Body() dto: LoginMobile2FADto) {
    return this.authService.loginWithMobile2FA(dto);
  }

  @Post('register/email')
  registerWithEmail(@Body() dto: RegisterEmailDto) {
    return this.authService.registerWithEmail(dto);
  }

  @Post('register/mobile')
  registerWithMobile(@Body() dto: RegisterMobileDto) {
    return this.authService.registerWithMobile(dto);
  }
}
