import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'
import { ConfigModule } from '@nestjs/config'
import { JwtAccessStrategy } from './strategies/jwt-access.strategy'
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy'
import { RefreshTokenService } from './services/refresh-token.service'
import { AuthController } from './auth.controller'
import {CACHE_SERVICE, PASSWORD_SERVICE} from "../@common/constants";
import {RedisService} from "../@common/services/redis/redis.service";
import {Argon2Service} from "../@common/services/argon2/argon2.service";

@Module({
  imports: [
      UsersModule,
      PassportModule,
      ConfigModule,
      JwtModule.register({}),

  ],
  providers: [
    AuthService,
    RefreshTokenService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
      {
          provide: PASSWORD_SERVICE,
          useClass: Argon2Service,
      },
      {
          provide: CACHE_SERVICE,
          useClass: RedisService,
      },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
