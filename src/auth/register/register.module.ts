import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RegisterController } from './controllers/register.controller';
import { RegisterService } from './services/register.service';
import { UserModule } from 'src/user/user.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret-key',
      signOptions: { expiresIn: '7d' },
    }),
    UserModule,
    OtpModule,
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
