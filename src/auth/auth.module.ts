import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { UserModule } from 'src/user/user.module';
// import { OtpModule } from 'src/otp/otp.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@Module({
  imports: [RegisterModule, LoginModule, ForgotPasswordModule],
  exports: [RegisterModule, LoginModule, ForgotPasswordModule],
})
export class AuthModule {}
