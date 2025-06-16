import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { OtpService } from './services/otp.service';

@Module({
  imports: [
    UserModule,
    // TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, OtpService],
  exports: [AuthService],
})
export class AuthModule {}
