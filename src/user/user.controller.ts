import { Controller, Post, Body, Session, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { type Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Permission } from '../entity/Permission';
import { LoginData } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @InjectRepository(User)
  private userRep: Repository<User>;

  @InjectRepository(Permission)
  private perRep: Repository<Permission>;

  @Post('init')
  async Init() {
    // 对页面a的权限控制
    const pera1 = new Permission();
    pera1.name = 'create_a';
    pera1.desc = '新增a';
    const pera2 = new Permission();
    pera2.name = 'remove_a';
    pera2.desc = '删除a';
    const pera3 = new Permission();
    pera3.name = 'update_a';
    pera3.desc = '修改a';
    const pera4 = new Permission();
    pera4.name = 'query_a';
    pera4.desc = '查找a';

    // 对页面b的权限控制
    const perb1 = new Permission();
    perb1.name = 'create_b';
    perb1.desc = '新增b';
    const perb2 = new Permission();
    perb2.name = 'remove_b';
    perb2.desc = '删除b';
    const perb3 = new Permission();
    perb3.name = 'update_b';
    perb3.desc = '修改b';
    const perb4 = new Permission();
    perb4.name = 'query_b';
    perb4.desc = '查找b';

    // 保存权限
    await this.perRep.save([
      pera1,
      pera2,
      pera3,
      pera4,
      perb1,
      perb2,
      perb3,
      perb4,
    ]);

    const user1 = new User();
    user1.username = '张三';
    user1.password = '123456';
    user1.permission = [pera1, pera4];

    const user2 = new User();
    user2.username = '李四';
    user2.password = '123456';
    user2.permission = [perb1, perb2, perb3, perb4];

    // 保存用户
    await this.userRep.save([user1, user2]);

    return 'ok!';
  }

  @HttpCode(200)
  @Post('login')
  async Login(@Body() loginData: LoginData, @Session() session) {
    try {
      const foundUser = await this.userService.login(loginData);
      if (foundUser.password === loginData.password) {
        session.user = {
          username: foundUser.username,
        };
      }
      return 'ok';
    } catch (e) {
      console.log(e.message, 'message');
    }
  }
}
