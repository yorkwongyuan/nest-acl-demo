import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { type Request } from 'express';
@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject()
  private userService: UserService;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.session.user;
    const result = await this.userService.findUser(user.username);
    console.log(result, 'result');
    return true;
  }
}
