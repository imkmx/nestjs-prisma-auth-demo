import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { ProfileDto } from './dto/profile.dto'
import { plainToInstance } from 'class-transformer'
import {UsersService} from "../users/users.service";

@Controller('api/profile')
@UseGuards(JwtAccessGuard)
@ApiTags('Profile')
@ApiBearerAuth()
export class ProfileController {

  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @ApiOperation({ summary: 'Getting a profile' })
  @ApiOkResponse({ type: ProfileDto })
  async getProfile(@Request() req): Promise<ProfileDto> {
    const user = await this.usersService.findById(req.user.id);
    return plainToInstance(ProfileDto, {
      userId: user.id,
      username: user.name
    });
  }
}
