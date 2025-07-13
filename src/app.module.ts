import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TenantMiddleware } from './common/middlewares/tenant.middleware';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { LocationModule } from './location/location.module';

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
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    OtpModule,
    UserModule,
    ProfileModule,
    LocationModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
