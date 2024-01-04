import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { type Request } from 'express';

// express-session中并没有user这个对象
// 为了防止类型报错, 这里加上该对象声明
declare module 'express-session' {
  interface Session {
    user: {
      username: string;
    };
  }
}

// 登录守卫
@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // 获取session中的user对象
    const user = request.session.user;
    // 如果存在user.username, 则说明cookie有效, 允许访问
    if (user && user.username) {
      return true;
    }
    // 否则说明尚未登录
    throw new UnauthorizedException('请先登录!');
  }
}
