import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProfileDto {
  @Expose()
  @ApiProperty()
  userId: string;

  @Expose()
  @ApiProperty()
  username: string;
}
