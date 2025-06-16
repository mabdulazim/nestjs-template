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
  RegisterEmail2FADto,
  RegisterMobile2FADto,
} from '../dto';
import { OtpService } from 'src/otp/services/otp.service';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private otpService: OtpService,
    private jwtService: JwtService,
  ) {}

  generateToken(user: User) {
    return this.jwtService.sign({ id: user.id });
  }

  // REGISTER EMAIL

  async registerWithEmail(dto: RegisterEmailDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user) {
      throw new BadRequestException('Email already in use');
    }

    await this.otpService.sendOTP({
      identifier: dto.email,
      purpose: 'register',
    });

    await this.otpService.storeData(dto.email, dto);

    return { message: 'OTP sent successfully' };
  }

  async registerWithEmail2FA(dto: RegisterEmail2FADto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user) {
      throw new BadRequestException('Email already in use');
    }

    const isValid = await this.otpService.verifyOTP({
      identifier: dto.email,
      purpose: 'register',
      otp: dto.otp,
    });

    if (!isValid) throw new UnauthorizedException('wrong otp code');

    const data: RegisterEmailDto = await this.otpService.getData(dto.email);

    const _user = await this.userService.createWithEmail(
      data.name,
      data.email,
      data.password,
      data.mobile,
    );
    const token = this.generateToken(_user);
    return { user: _user, token };
  }

  // REGISTER MOBILE

  async registerWithMobile(dto: RegisterMobileDto) {
    const user = await this.userService.findByMobile(dto.mobile);
    if (user) {
      throw new BadRequestException('Mobile already in use');
    }

    await this.otpService.sendOTP({
      identifier: dto.mobile,
      purpose: 'register',
    });
    await this.otpService.storeData(dto.mobile, dto);

    return { message: 'OTP sent successfully' };
  }

  async registerWithMobile2FA(dto: RegisterMobile2FADto) {
    const user = await this.userService.findByMobile(dto.mobile);
    if (user) {
      throw new BadRequestException('Mobile already in use');
    }

    const isValid = await this.otpService.verifyOTP({
      identifier: dto.mobile,
      otp: dto.otp,
      purpose: 'register',
    });
    if (!isValid) throw new UnauthorizedException();

    const data: RegisterMobileDto = await this.otpService.getData(dto.mobile);

    const _user = await this.userService.createWithMobile(
      data.name,
      data.mobile,
      data.email,
    );
    const token = this.generateToken(_user);
    return { user: _user, token };
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
