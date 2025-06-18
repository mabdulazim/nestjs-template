import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ChangeMobileDto, ValidateOTPDto } from '../dto/change-mobile.dto';
import { OtpService } from 'src/otp/services/otp.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ChangeMobileService {
  constructor(
    private userService: UserService,
    private otpService: OtpService,
  ) {}

  async changeMobile(dto: ChangeMobileDto) {
    const userMobile = await this.userService.findByMobile(dto.mobile);
    if (userMobile) {
      throw new BadRequestException('mobile already exist');
    }

    const userId = 1; // get from session
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid data');
    }

    await this.otpService.sendOTP({
      identifier: dto.mobile,
      purpose: 'change-mobile',
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
      identifier: dto.mobile,
      purpose: 'change-mobile',
      otp: dto.otp,
    });

    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP');
    }

    await this.userService.updateMobileByid(userId, dto.mobile);

    return { message: 'OTP Code is valid' };
  }
}
