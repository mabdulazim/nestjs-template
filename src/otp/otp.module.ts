import { Module } from '@nestjs/common';
import { OtpService } from './services/otp.service';
import { UnifonicService } from './services/unifonic.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    OtpService,
    {
      provide: 'provider',
      useClass: UnifonicService,
    },
  ],
  exports: [OtpService],
})
export class OtpModule {}
