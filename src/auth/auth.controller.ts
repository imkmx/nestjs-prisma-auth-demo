import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserDto } from './dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { User } from '@prisma/client';
import {
  IAuthRefreshRequest,
  IAuthRequest,
  IAuthResult,
  IAuthUser,
} from './auth.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { LogoutDto } from './dto/logout.dto';

@Controller('api/auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiOkResponse({ type: UserDto })
  @UseInterceptors(new TransformInterceptor(UserDto))
  register(@Body() dto: RegisterUserDto): Promise<User> {
    return this.authService.register(dto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User authorization' })
  @ApiOkResponse({ type: AuthDto })
  @UseInterceptors(new TransformInterceptor(AuthDto))
  login(
    @Body() dto: LoginUserDto,
    @Request() req: IAuthRequest,
  ): Promise<IAuthResult> {
    return this.authService.login(req.user);
  }

  @Post('logout')
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: `User's logout` })
  @ApiOkResponse({ type: LogoutDto })
  @UseInterceptors(new TransformInterceptor(LogoutDto))
  async logout(@Request() req: IAuthRequest): Promise<IAuthUser> {
    await this.authService.logout(req.user?.userId);
    return req.user;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Token update' })
  @ApiOkResponse({ type: AuthDto })
  @UseInterceptors(new TransformInterceptor(AuthDto))
  refreshTokens(@Request() req: IAuthRefreshRequest): Promise<IAuthResult> {
    return this.authService.refreshTokens(req.user);
  }
}
