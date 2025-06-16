import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { randomInt } from 'crypto';
import { SendOtpDto, VerifyOtpDto } from '../dto/otp.dto';

@Injectable()
export class OtpService {
  private redis = new Redis();

  private buildKey(mobile: string, purpose: string): string {
    return `otp:${purpose}:${mobile}`;
  }

  async sendOTP(dto: SendOtpDto): Promise<void> {
    const { mobile, purpose } = dto;
    const code = randomInt(100000, 999999).toString();
    const key = this.buildKey(mobile, purpose);
    await this.redis.set(key, code, 'EX', 300); // 5 minutes
  }

  async verifyOTP(dto: VerifyOtpDto): Promise<boolean> {
    const { mobile, purpose, code } = dto;
    const key = this.buildKey(mobile, purpose);
    const storedCode = await this.redis.get(key);
    if (storedCode === code) {
      await this.redis.del(key);
      return true;
    }
    return false;
  }
}
