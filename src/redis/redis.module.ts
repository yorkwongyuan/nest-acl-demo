import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [RedisService, {
    provide: 'REDIS_CLIENT',
    async useFactory () {
      const client = await createClient({
        socket: {
          port: 6379,
          host: 'localhost'
        }
      })
      client.connect()
      return client
    }
  }],
  exports: [RedisService]
})
export class RedisModule {}
