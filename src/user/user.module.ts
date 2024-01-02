import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entity/User';
import { Permission } from '../entity/Permission';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionGuard } from '../permission/permission.guard'
@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  controllers: [UserController],
  providers: [UserService, PermissionGuard],
  exports: [UserService, PermissionGuard],
})
export class UserModule {}
