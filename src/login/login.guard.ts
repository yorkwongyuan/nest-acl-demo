import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { type Request } from 'express';

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
    const user = request.session.user;
    if (user && user.username) {
      return true;
    }
    throw new UnauthorizedException('请先登录!');
  }
}
