import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { UserService } from '../user/user.service';
import { type Request } from 'express';
import { RedisService } from '../redis/redis.service';
@Injectable()
export class PermissionGuard implements CanActivate {

  // 获取redisService
  @Inject()
  private redisService: RedisService

  // 通过反射获取路由上的元数据
  @Inject()
  private relfector: Reflector

  @Inject()
  private userService: UserService;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.session && request.session.user;
    if (user) {
      let permission
      // 首先读取redis缓存数据
      const redisData = await this.redisService.getRedis(user.username)
      console.log(redisData, '??')
      if (redisData && Array.isArray(redisData) && redisData.length > 0) {
        permission = redisData
      // 如果没有缓存, 则查表
      } else {
        // 联表查询出这个用户的权限
        const result = await this.userService.findUser(user.username);
        permission = result.permission.map(item => item.name)
        // 缓存进redis
        this.redisService.setRedis(user.username, permission)
      }
      console.log(permission, 'perm11isssion')
      // 获取当前路由的权限
      const auth = this.relfector.get('permission', context.getHandler())
      // 如果无权限要求, 则直接放行
      if (!auth) return true
      // 如果是数组, 多个权限
      if (Array.isArray(auth)) {
        if (permission.some(item => auth.includes(item))) {
          return true
        } else {
          throw new HttpException('权限不足', 200)
        }
      // 如果是字符串, 单个权限
      } else if (typeof auth === 'string') {
        if (permission.some(item => item === auth)) {
          return true
        } else {
          throw new HttpException('权限不足', 200)
        }
      }
      
    }
  }
}
