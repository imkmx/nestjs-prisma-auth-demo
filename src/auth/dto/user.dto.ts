import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty()
  @Transform((data) => data?.obj?.id, { toClassOnly: true })
  userId: string;

  @Expose()
  @ApiProperty()
  @Transform((data) => data?.obj?.name, { toClassOnly: true })
  username: string;
}
