import { Inject, Injectable } from '@nestjs/common'
import { CACHE_SERVICE, PASSWORD_SERVICE } from '../../@common/constants'
import { ConfigService } from '@nestjs/config'
import {ICacheService, IPasswordService} from "../../@common/interfaces";

@Injectable()
export class RefreshTokenService {
  private readonly prefix = 'refresh_token'

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_SERVICE) private cacheService: ICacheService,
    @Inject(PASSWORD_SERVICE) private passwordService: IPasswordService,
  ) {}

  private getKey(userId: number): string {
    return `${this.prefix}:${userId}`
  }

  private async setToken(userId: number, refreshToken: string): Promise<void> {
    await this.cacheService.set(
      this.getKey(userId),
      refreshToken,
      this.configService.get('JWT_REFRESH_EXPIRES'),
    )
  }

  async getToken(userId: number): Promise<string> {
    return this.cacheService.get(this.getKey(userId))
  }

  async updateToken(userId: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await this.passwordService.hash(refreshToken)
    await this.setToken(userId, hashedRefreshToken)
  }

  async compareTokens(
    hashedRefreshToken: string,
    refreshToken: string,
  ): Promise<boolean> {
    return this.passwordService.verify(hashedRefreshToken, refreshToken)
  }

  async removeToken(userId: number): Promise<number> {
    return this.cacheService.del(this.getKey(userId))
  }
}
