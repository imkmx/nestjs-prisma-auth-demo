import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @Length(1, 191)
  @IsString()
  username: string;

  @ApiProperty()
  @Length(1, 191)
  @IsString()
  password: string;
}
