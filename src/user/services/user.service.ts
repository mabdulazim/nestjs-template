import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TenantBaseService } from 'src/common/services/tenant.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService extends TenantBaseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id, storeId: this.storeId });
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

  async updateEmailByid(id: number, email: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      return null;
    }
    user.email = email;
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
      storeId: this.storeId,
      name,
      mobile,
      email: email || '',
      isMobileVerified: true,
      isEmailVerified: false,
    });
    return this.userRepo.save(user);
  }

  async updateUserById(id: number, name: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) return null;
    user.name = name;
    return this.userRepo.save(user);
  }
}
