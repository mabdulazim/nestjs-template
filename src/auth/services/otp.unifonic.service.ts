import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { IOtpService } from '../interfaces/otp.interface';

@Injectable()
export class UnifonicOtpService implements IOtpService {
  private otpStore = new Map<string, string>();

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOtp(mobile: string, code: string): Promise<void> {
    const url = `${this.configService.get('UNIFONIC_BASE_URL')}/SMS/messages`;

    const payload = {
      AppSid: this.configService.get('UNIFONIC_APP_SID'),
      Recipient: mobile,
      Body: `Your OTP is: ${code}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, payload),
      );
      if (response.data.success !== 'true') {
        throw new HttpException('Failed to send OTP', HttpStatus.BAD_GATEWAY);
      }
    } catch (error) {
      throw new HttpException(
        'Unifonic error: ' + error.message,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async sendOtpWithStore(mobile: string): Promise<void> {
    const code = this.generateOtp();
    await this.sendOtp(mobile, code);
    this.otpStore.set(mobile, code);
    setTimeout(() => this.otpStore.delete(mobile), 5 * 60 * 1000); // 5 min expiry
  }

  verifyOtp(mobile: string, code: string): boolean {
    const stored = this.otpStore.get(mobile);
    return stored === code;
  }
}
