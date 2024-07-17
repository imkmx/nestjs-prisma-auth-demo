import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDto } from './dto/users.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';

@Controller('api/users')
@UseGuards(JwtAccessGuard)
@ApiBearerAuth()
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Getting all users' })
  @ApiOkResponse({ type: UsersDto })
  async getAll(): Promise<UsersDto> {
    const users = await this.usersService.findAll();
    return plainToInstance(UsersDto, {
      data: users,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Getting a user' })
  @ApiOkResponse({ type: UserDto })
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const user = await this.usersService.findById(id);
    return plainToInstance(UserDto, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Changing a user' })
  @ApiOkResponse({ type: UserDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.usersService.update(id, dto);
    return plainToInstance(UserDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleting a user' })
  @ApiOkResponse({ type: UserDto })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const user = await this.usersService.remove(id);
    return plainToInstance(UserDto, user);
  }
}
