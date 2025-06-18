import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginMobileDto,
  LoginMobile2FADto,
  LoginEmailDto,
} from '../dto/login.dto';
import { OtpService } from 'src/otp/services/otp.service';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LoginService {
  constructor(
    private userService: UserService,
    private otpService: OtpService,
    private jwtService: JwtService,
  ) {}

  generateToken(user: User) {
    return this.jwtService.sign({ id: user.id });
  }

  // LOGIN EMAIL
  async loginWithEmail(dto: LoginEmailDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.generateToken(user);
    return { user, token };
  }

  // LOGIN MOBILE
  async loginWithMobile(dto: LoginMobileDto) {
    const user = await this.userService.findByMobile(dto.mobile);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    await this.otpService.sendOTP({ identifier: dto.mobile, purpose: 'login' });
    return { message: 'OTP sent successfully' };
  }

  async loginWithMobile2FA(dto: LoginMobile2FADto) {
    const user = await this.userService.findByMobile(dto.mobile);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await this.otpService.verifyOTP({
      identifier: dto.mobile,
      otp: dto.otp,
      purpose: 'login',
    });
    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const token = this.generateToken(user);
    return { user, token };
  }
}
