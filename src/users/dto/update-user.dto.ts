import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class UpdateUserDto {
  @ApiPropertyOptional()
  @Length(1, 191)
  @IsString()
  name?: string
}
