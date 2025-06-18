import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RegisterController } from './controllers/register.controller';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { UserModule } from 'src/user/user.module';
import { OtpModule } from 'src/otp/otp.module';
import { ForgotPasswordController } from './controllers/forgot-password.controller';
import { ForgotPasswordService } from './services/forgot-password.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret-key',
      signOptions: { expiresIn: '7d' },
    }),
    UserModule,
    OtpModule,
  ],
  controllers: [RegisterController, LoginController, ForgotPasswordController],
  providers: [RegisterService, LoginService, ForgotPasswordService],
  exports: [RegisterService, LoginService, ForgotPasswordService],
})
export class AuthModule {}
