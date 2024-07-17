import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import { getAuthConfig } from './auth.config';
import { AuthRefreshTokenService } from './auth-refresh-token.service';
import {
  IAuthResult,
  IAuthUser,
  IPayload,
  IRefreshTokenPayload,
} from './auth.interface';
import { User } from '@prisma/client';
import { Argon2PasswordService } from '../common/services/argon2-password.service';

@Injectable()
export class AuthService {
  private readonly config = getAuthConfig(this.configService);

  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: AuthRefreshTokenService,
    private passwordService: Argon2PasswordService,
  ) {}

  async register({ username, password }: RegisterUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hash(password);
    console.dir({hashedPassword}, {depth: null})
    return this.usersService.createOne(username, hashedPassword);
  }

  async login(user: IAuthUser): Promise<IAuthResult> {
    const payload = { username: user.username, sub: user.userId };
    const tokens = await this.getTokens(payload);
    await this.refreshTokenService.updateToken(
      user.userId,
      tokens.refreshToken,
    );
    return tokens;
  }

  async logout(userId: number): Promise<void> {
    await this.refreshTokenService.removeToken(userId);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<IAuthUser | null> {
    const user = await this.usersService.findByName(username);
    const passwordMatches = await this.passwordService.verify(
      user.password,
      password,
    );

    if (user && passwordMatches) {
      const { id, name } = user;
      return {
        userId: id,
        username: name,
      };
    }

    return null;
  }

  async refreshTokens({
    username,
    refreshToken,
  }: IRefreshTokenPayload): Promise<IAuthResult> {
    const user = await this.usersService.findByName(username);
    const hashedRefreshToken = await this.refreshTokenService.getToken(user.id);

    if (!user || !hashedRefreshToken) {
      throw new UnauthorizedException();
    }

    const refreshTokenMatches = await this.refreshTokenService.compareTokens(
      hashedRefreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens({
      username: user.name,
      sub: user.id,
    });

    await this.refreshTokenService.updateToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async checkLogged(userId: number): Promise<boolean> {
    const refreshToken = await this.refreshTokenService.getToken(userId);
    return !!refreshToken;
  }

  private async getTokens({ username, sub }: IPayload): Promise<IAuthResult> {
    const [accessToken, refreshToken] = await Promise.all(
      this.config.jwtOptions.map((opts) =>
        this.jwtService.sign(
          {
            sub,
            username,
          },
          opts,
        ),
      ),
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
