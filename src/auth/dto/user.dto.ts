import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  @Transform((data) => data?.obj?.id, { toClassOnly: true })
  userId: string;

  @ApiProperty()
  @Transform((data) => data?.obj?.name, { toClassOnly: true })
  username: string;
}
