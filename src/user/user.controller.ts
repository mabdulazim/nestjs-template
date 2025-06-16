import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './services/user.service';
// import {  RegisterDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() dto: any) {
    return this.userService.findByEmail(dto);
  }

  @Post('register')
  register(@Body() dto: any) {
    return this.userService.findByEmail(dto);
  }
}
