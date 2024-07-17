import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import parseDuration from 'parse-duration';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async set(key: string, value: any, ttl: string) {
    return this.redis.set(key, value, 'EX', parseDuration(ttl, 's'));
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async del(key: string) {
    return this.redis.del(key);
  }
}
