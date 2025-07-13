import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { City } from '../city/city.entity';
import { District } from '../district/district.entity';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeId: number;

  @Column()
  cityId: number;

  @Column()
  districtId: number;

  @Column()
  opensFrom: string;

  @Column()
  opensTo: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => City, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cityId' })
  city: City;

  @ManyToOne(() => District, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'districtId' })
  district: District;
}
