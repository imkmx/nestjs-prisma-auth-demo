import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDto } from './dto/users.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { User } from '@prisma/client';

@Controller('api/users')
@UseGuards(JwtAccessGuard)
@ApiBearerAuth()
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Getting all users' })
  @ApiOkResponse({ type: UsersDto })
  @UseInterceptors(new TransformInterceptor(UsersDto))
  async getAll(): Promise<{ data: User[] }> {
    const users = await this.usersService.findAll();
    return {
      data: users,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Getting a user' })
  @ApiOkResponse({ type: UserDto })
  @UseInterceptors(new TransformInterceptor(UserDto))
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Changing a user' })
  @ApiOkResponse({ type: UserDto })
  @UseInterceptors(new TransformInterceptor(UserDto))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleting a user' })
  @ApiOkResponse({ type: UserDto })
  @UseInterceptors(new TransformInterceptor(UserDto))
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.remove(id);
  }
}
