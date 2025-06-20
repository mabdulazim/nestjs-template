import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'muhammad',
      password: '',
      database: 'haraj',
      entities: [User],
      // entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    OtpModule,
    UserModule,
    ProfileModule,
  ],
})
export class AppModule {}
