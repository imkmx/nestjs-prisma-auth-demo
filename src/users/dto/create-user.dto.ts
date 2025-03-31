import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @Length(1, 191)
  @IsString()
  name: string;

  @ApiProperty()
  @Length(6, 191)
  @IsString()
  password: string;
} 