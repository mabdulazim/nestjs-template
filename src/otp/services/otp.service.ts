import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { randomInt } from 'crypto';
import { SendOtpDto, VerifyOtpDto } from '../dto/otp.dto';
import { IOtpService } from '../interfaces/otp.interface';

@Injectable()
export class OtpService {
  constructor(
    @Inject('iOtpService') private readonly iOtpService: IOtpService,
  ) {}

  private redis = new Redis();

  private otpKey(identifier: string, purpose: string): string {
    return `otp:${purpose}:${identifier}`;
  }

  private lastSentKey(identifier: string, purpose: string): string {
    return `otp_last_sent:${purpose}:${identifier}`;
  }

  generateOTP(): string {
    return randomInt(100000, 999999).toString();
  }

  async sendOTP(dto: SendOtpDto): Promise<void> {
    const { identifier, purpose } = dto;
    const otpCode = this.generateOTP();
    const otpKey = this.otpKey(identifier, purpose);
    const lastSentKey = this.lastSentKey(identifier, purpose);
    await this.redis.set(otpKey, otpCode, 'EX', 300); // 5 minutes
    await this.redis.set(lastSentKey, '1', 'EX', 30); // Cooldown 30s

    console.log('otpCode', otpCode);

    this.iOtpService.sendOTP(identifier, otpCode);
  }

  async resendOtp(dto: SendOtpDto) {
    const { identifier, purpose } = dto;
    const otpKey = this.otpKey(identifier, purpose);
    const lastSentKey = this.lastSentKey(identifier, purpose);
    const attemptsKey = `otp_attempts:${purpose}:${identifier}`;

    // 1. Check if resent too soon
    const lastSent = await this.redis.get(lastSentKey);
    if (lastSent) {
      throw new BadRequestException(
        'Please wait 3 minutes before requesting again.',
      );
    }

    // 2. Check max resend attempts
    const attempts = parseInt(await this.redis.get(attemptsKey)) || 0;
    if (attempts >= 5) {
      throw new BadRequestException('You exceeded the resend limit.');
    }

    // 3. Generate or reuse OTP
    let otpCode = await this.redis.get(otpKey);
    if (!otpCode) {
      otpCode = this.generateOTP();
      await this.redis.set(otpKey, otpCode, 'EX', 300); // 5 min
    }

    // 4. Send OTP via email or sms
    await this.iOtpService.sendOTP(identifier, otpCode);

    // 5. Update Redis keys
    await this.redis.set(lastSentKey, '1', 'EX', 30); // Cooldown 30s
    await this.redis.set(attemptsKey, (attempts + 1).toString(), 'EX', 3600); // 1 hour

    return { message: 'OTP resent successfully' };
  }

  async verifyOTP(dto: VerifyOtpDto): Promise<boolean> {
    const { identifier, purpose, otp } = dto;
    const key = this.otpKey(identifier, purpose);
    const storedOtpCode = await this.redis.get(key);
    if (storedOtpCode === otp) {
      await this.redis.del(key);
      return true;
    }
    return false;
  }

  async storeData(identifier: string, data: any, ttl: number = 300) {
    await this.redis.set(`data:${identifier}`, JSON.stringify(data), 'EX', ttl);
  }

  async getData(identifier: string): Promise<any> {
    const data = await this.redis.get(`data:${identifier}`);
    return data ? JSON.parse(data) : null;
  }

  async deleteData(key: string) {
    await this.redis.del(`data:${key}`);
  }
}
