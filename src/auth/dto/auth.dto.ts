import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthDto {
  @Expose()
  @ApiProperty()
  @IsString()
  accessToken: string;

  @Expose()
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
