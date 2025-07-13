import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ChangeEmailDto, ValidateOTPDto } from '../dto/change-email.dto';
import { OtpService } from 'src/otp/services/otp.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ChangeEmailService {
  constructor(
    private userService: UserService,
    private otpService: OtpService,
  ) {}

  async changeEmail(dto: ChangeEmailDto) {
    const userEmail = await this.userService.findByEmail(dto.email);
    if (userEmail) {
      throw new BadRequestException('email already exist');
    }

    const userId = 1; // get from session
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid data');
    }

    await this.otpService.sendOTP({
      identifier: dto.email,
      purpose: 'change-email',
    });

    return { message: 'OTP sent successfully' };
  }

  async validateOTP(dto: ValidateOTPDto) {
    const userId = 1; // get from session
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid data');
    }

    const isValid = await this.otpService.verifyOTP({
      identifier: dto.email,
      purpose: 'change-email',
      otp: dto.otp,
    });

    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP');
    }

    await this.userService.updateEmailByid(userId, dto.email);

    return { message: 'OTP Code is valid' };
  }
}
