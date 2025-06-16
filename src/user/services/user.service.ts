import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findByMobile(mobile: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { mobile } });
  }

  async findByVerifiedEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email, isEmailVerified: true } });
  }

  async findByVerifiedMobile(mobile: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { mobile, isMobileVerified: true } });
  }

  async createWithEmail(
    name: string,
    email: string,
    password: string,
    mobile?: string,
  ) {
    const user = this.userRepo.create({
      name,
      email,
      password,
      mobile: mobile || '',
      isEmailVerified: true,
      isMobileVerified: false,
    });
    return this.userRepo.save(user);
  }

  async createWithMobile(name: string, mobile: string, email?: string) {
    const user = this.userRepo.create({
      name,
      mobile,
      email: email || '',
      isMobileVerified: true,
      isEmailVerified: false,
    });
    return this.userRepo.save(user);
  }
}
