import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ForgotPasswordDto,
  ValidateOTPDto,
  ChangePasswordDto,
} from '../dto/forgot-password.dto';
import { OtpService } from 'src/otp/services/otp.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private userService: UserService,
    private otpService: OtpService,
    private jwtService: JwtService,
  ) {}

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid data');
    }

    await this.otpService.sendOTP({
      identifier: dto.email,
      purpose: 'forgotpassword',
    });

    return { message: 'OTP sent successfully' };
  }

  async validateOTP(dto: ValidateOTPDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid data');
    }

    const isValid = await this.otpService.verifyOTP(
      {
        identifier: dto.email,
        purpose: 'forgotpassword',
        otp: dto.otp,
      },
      false,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP');
    }

    return { message: 'OTP Code is valid' };
  }

  async changePassword(dto: ChangePasswordDto) {
    const isValid = await this.otpService.verifyOTP({
      identifier: dto.email,
      purpose: 'forgotpassword',
      otp: dto.otp,
    });

    if (!isValid) {
      throw new UnauthorizedException('Change password session is expired');
    }

    const user = await this.userService.updatePasswordByEmail(
      dto.email,
      dto.password,
    );
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    return { message: 'Password updated successfully' };
  }
}
