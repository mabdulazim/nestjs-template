import { Module } from '@nestjs/common';
import { ChangeMobileController } from './controllers/change-mobile.controller';
import { ChangeMobileService } from './services/change-mobile.service';
import { UserModule } from 'src/user/user.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [UserModule, OtpModule],
  controllers: [ChangeMobileController],
  providers: [ChangeMobileService],
  exports: [ChangeMobileService],
})
export class ProfileModule {}
