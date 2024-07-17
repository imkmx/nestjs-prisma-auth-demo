import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ProfileDto } from '../profile/dto/profile.dto';

@Controller('api/auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiOkResponse({ type: UserDto })
  async register(@Body() dto: RegisterUserDto): Promise<UserDto> {
    console.dir({dto}, {depth: null})
    const user = await this.authService.register(dto);
    return plainToInstance(UserDto, user);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User authorization' })
  @ApiOkResponse({ type: AuthDto })
  async login(@Body() dto: LoginUserDto, @Request() req): Promise<AuthDto> {
    const result = await this.authService.login(req.user);
    return plainToInstance(AuthDto, result);
  }

  @Post('logout')
  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: `User's logout` })
  @ApiOkResponse({ type: UserDto })
  async logout(@Request() req): Promise<UserDto> {
    await this.authService.logout(req.user?.userId);
    return plainToInstance(ProfileDto, req.user);
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Token update' })
  @ApiOkResponse({ type: AuthDto })
  async refreshTokens(@Request() req): Promise<AuthDto> {
    const result = await this.authService.refreshTokens(req.user);
    return plainToInstance(AuthDto, result);
  }
}
