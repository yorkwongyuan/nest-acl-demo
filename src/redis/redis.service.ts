import { Injectable, Inject } from '@nestjs/common';
import { type RedisClientType } from 'redis'

type Permission = Array<{name:string}>
@Injectable()
export class RedisService {
    @Inject('REDIS_CLIENT')
    private client: RedisClientType
    async getRedis (key: string) {
        return await this.client.lRange(key, 0, -1)
    }
    setRedis (key:string, permission: string[], ttl?: number) {
        for (let i = 0; i <= permission.length; i++) {
            const name = permission[i] && permission[i]
            if (name) {
                this.client.lPush(key, name)
            }
        }
        if (ttl) {
            this.client.expire(key, ttl)
        }
    }
}
