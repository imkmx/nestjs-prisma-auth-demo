import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2PasswordService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verify(hashedPassword: string, password: string): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }
}
