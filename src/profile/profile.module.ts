import { Module } from '@nestjs/common';
import { ChangeMobileController } from './controllers/change-mobile.controller';
import { ChangeEmailController } from './controllers/change-email.controller';
import { ChangeMobileService } from './services/change-mobile.service';
import { ChangeEmailService } from './services/change-email.service';
import { UserModule } from 'src/user/user.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [UserModule, OtpModule],
  controllers: [ChangeMobileController, ChangeEmailController],
  providers: [ChangeMobileService, ChangeEmailService],
  exports: [ChangeMobileService, ChangeEmailService],
})
export class ProfileModule {}
