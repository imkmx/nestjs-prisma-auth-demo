import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LogoutDto {
  @Expose()
  @ApiProperty()
  userId: string;

  @Expose()
  @ApiProperty()
  username: string;
}
