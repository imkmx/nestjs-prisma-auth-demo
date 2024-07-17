import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from '../common/services/redis-cache.service';
import { Argon2PasswordService } from '../common/services/argon2-password.service';

@Injectable()
export class AuthRefreshTokenService {
  private readonly prefix = 'refresh_token';

  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: RedisCacheService,
    private readonly passwordService: Argon2PasswordService,
  ) {}

  private getKey(userId: number): string {
    return `${this.prefix}:${userId}`;
  }

  private async setToken(userId: number, refreshToken: string): Promise<void> {
    await this.cacheService.set(
      this.getKey(userId),
      refreshToken,
      this.configService.get('jwt.refresh.expiresIn'),
    );
  }

  async getToken(userId: number): Promise<string> {
    return this.cacheService.get(this.getKey(userId));
  }

  async updateToken(userId: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await this.passwordService.hash(refreshToken);
    await this.setToken(userId, hashedRefreshToken);
  }

  async compareTokens(
    hashedRefreshToken: string,
    refreshToken: string,
  ): Promise<boolean> {
    return this.passwordService.verify(hashedRefreshToken, refreshToken);
  }

  async removeToken(userId: number): Promise<number> {
    return this.cacheService.del(this.getKey(userId));
  }
}
