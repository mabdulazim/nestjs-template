import { Module } from '@nestjs/common';
import { OtpService } from './services/otp.service';
import { UnifonicOtpService } from './services/otp.unifonic.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    OtpService,
    {
      provide: 'iOtpService',
      useClass: UnifonicOtpService,
    },
  ],
  exports: [OtpService],
})
export class OtpModule {}
