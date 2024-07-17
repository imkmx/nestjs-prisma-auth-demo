import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import {PrismaModule} from "./common/modules/prisma.module";
import {AppConfigModule} from "./config/config.module";
import {AppRedisModule} from "./common/modules/redis.module";

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    AppRedisModule,
    AuthModule,
    ProfileModule,
    UsersModule,
  ],
})
export class AppModule {}
