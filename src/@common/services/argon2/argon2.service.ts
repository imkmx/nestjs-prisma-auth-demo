import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import {IPasswordService} from "../../interfaces";
import {Options} from "argon2";

@Injectable()
export class Argon2Service implements IPasswordService {
  private readonly options: Options = {
    type: 2,
  }

  async hash(password: string): Promise<string> {
    return argon2.hash(password, this.options)
  }

  async verify(hashedPassword: string, password: string): Promise<boolean> {
    return argon2.verify(hashedPassword, password, this.options)
  }
}
