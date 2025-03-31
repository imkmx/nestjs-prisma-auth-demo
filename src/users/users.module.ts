import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Argon2PasswordService } from '../common/services/argon2-password.service';

@Module({
  providers: [UsersService, Argon2PasswordService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
