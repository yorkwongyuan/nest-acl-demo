import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginData } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { type Repository } from 'typeorm';
import { User } from '../entity/User';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRep: Repository<User>;

  async login(loginData: LoginData) {
    const foundUser = await this.userRep.findOneBy({
      username: loginData.username,
    });

    if (!foundUser) {
      throw new HttpException('用户不存在', 200);
    }

    return foundUser;
  }

  async findUser(username: string) {
    return await this.userRep.findOne({
      where: {
        username,
      },
      relations: {
        permission: true,
      },
    });
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
