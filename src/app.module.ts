import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ProfileModule } from './profile/profile.module';
import {PrismaModule} from "./common/modules/prisma.module";

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        options: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          keyPrefix: configService.get('REDIS_PREFIX'),
        },
      }),
    }),
    AuthModule,
    ProfileModule,
    UsersModule,
  ],
})
export class AppModule {}
