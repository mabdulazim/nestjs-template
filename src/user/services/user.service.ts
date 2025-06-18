import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

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

  async updatePasswordByEmail(
    email: string,
    newPassword: string,
  ): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    return this.userRepo.save(user);
  }

  async updateMobileByid(id: number, mobile: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      return null;
    }
    user.mobile = mobile;
    return this.userRepo.save(user);
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
