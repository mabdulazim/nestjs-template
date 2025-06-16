import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginMobileDto,
  LoginMobile2FADto,
  LoginEmailDto,
  RegisterMobileDto,
  RegisterEmailDto,
} from '../dto';
import { OtpService } from './otp.service';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private otpService: OtpService,
    private jwtService: JwtService,
  ) {}

  async registerWithEmail(dto: RegisterEmailDto) {
    if (!dto.email || !dto.password) {
      throw new BadRequestException();
    }

    const user = this.userService.findByEmail(dto.email);
    if (user) {
      throw new BadRequestException('Email already in use');
    }

    return this.userService.createWithEmail(
      dto.name,
      dto.email,
      dto.password,
      dto.mobile,
    );
  }

  async registerWithMobile(dto: RegisterMobileDto) {
    if (!dto.mobile) throw new BadRequestException();

    const user = this.userService.findByMobile(dto.mobile);
    if (user) {
      throw new BadRequestException('Mobile already in use');
    }

    const isValid = await this.otpService.verifyOTP({
      mobile: dto.mobile,
      code: dto.otp,
      purpose: 'register',
    });
    if (!isValid) throw new UnauthorizedException();
    return this.userService.createWithMobile(dto.name, dto.mobile, dto.email);
  }

  async loginWithEmail(dto: LoginEmailDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.generateToken(user);
    return { user, token };
  }

  async loginWithMobile(dto: LoginMobileDto) {
    const user = await this.userService.findByMobile(dto.mobile);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    await this.otpService.sendOTP({ mobile: dto.mobile, purpose: 'login' });
    return { message: 'OTP sent successfully' };
  }

  async loginWithMobile2FA(dto: LoginMobile2FADto) {
    const user = await this.userService.findByMobile(dto.mobile);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await this.otpService.verifyOTP({
      mobile: dto.mobile,
      code: dto.otp,
      purpose: 'login',
    });
    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  generateToken(user: User) {
    return this.jwtService.sign({ id: user.id });
  }
}
