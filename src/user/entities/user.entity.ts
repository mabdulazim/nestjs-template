import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeId: number;

  @Column({ unique: true })
  mobile: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column()
  name: string;

  @Column({ default: false })
  isMobileVerified: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
