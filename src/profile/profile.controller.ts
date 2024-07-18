import {
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { User } from '@prisma/client';
import { IAuthRequest } from '../auth/auth.interface';
import { UserDto } from '../auth/dto/user.dto';

@Controller('api/profile')
@UseGuards(JwtAccessGuard)
@ApiTags('Profile')
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Getting a profile' })
  @ApiOkResponse({ type: UserDto })
  @UseInterceptors(new TransformInterceptor(UserDto))
  async getProfile(@Request() req: IAuthRequest): Promise<User> {
    return this.usersService.findById(req.user.userId);
  }
}
