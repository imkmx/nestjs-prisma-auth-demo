import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from './user.dto';

@Exclude()
export class UsersDto {
  @Expose()
  @Type(() => UserDto)
  @ApiProperty({ type: UserDto, isArray: true })
  data: UserDto[];
}
