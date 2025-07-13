import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChangeInfoDto } from '../dto/change-info.dto';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ChangeInfoService {
  constructor(private userService: UserService) {}

  async changeInfo(dto: ChangeInfoDto) {
    const userId = 1; // get from session
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid data');
    }

    await this.userService.updateUserById(userId, dto.name);

    return { message: 'User updated successfully' };
  }
}
