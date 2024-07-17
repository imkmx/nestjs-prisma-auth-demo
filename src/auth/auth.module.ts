import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthRefreshTokenService } from './auth-refresh-token.service';
import { AuthController } from './auth.controller';
import { RedisCacheService } from '../common/services/redis-cache.service';
import { Argon2PasswordService } from '../common/services/argon2-password.service';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule, JwtModule.register({})],
  providers: [
    AuthService,
    AuthRefreshTokenService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    Argon2PasswordService,
    RedisCacheService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
