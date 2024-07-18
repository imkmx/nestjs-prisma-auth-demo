import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RegisterUserDto {
  @Expose()
  @ApiProperty()
  @Length(1, 191)
  @IsString()
  username: string;

  @Expose()
  @ApiProperty()
  @Length(1, 191)
  @IsString()
  password: string;
}
