import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { IProvider } from '../interfaces/provider.interface';

@Injectable()
export class UnifonicService implements IProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendOTP(mobile: string, code: string): Promise<void> {
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
        throw new HttpException(
          'Failed to send OTP',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Unifonic error: ' + error.message,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
