import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createOne(name: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
    });

    if (user) {
      throw new ForbiddenException();
    }

    return this.prisma.user.create({
      data: {
        name,
        password,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return this.getUserOrThrow({ id });
  }

  async findByName(name: string): Promise<User> {
    return this.getUserOrThrow({ name });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    await this.getUserOrThrow({ id });
    return this.prisma.user.update({
      data: {
        name: data.name,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<User> {
    await this.getUserOrThrow({ id });
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  private async getUserOrThrow(where: {
    id?: number;
    name?: string;
  }): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
