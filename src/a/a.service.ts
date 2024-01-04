import { Injectable } from '@nestjs/common';
import { CreateADto } from './dto/create-a.dto';
import { UpdateADto } from './dto/update-a.dto';

@Injectable()
export class AService {
  create(createADto: CreateADto) {
    return '请求成功!';
  }

  findAll() {
    return `This action returns all a`;
  }

  findOne(id: number) {
    return `This action returns a #${id} a`;
  }

  update(id: number, updateADto: UpdateADto) {
    return `This action updates a #${id} a`;
  }

  remove(id: number) {
    return `This action removes a #${id} a`;
  }
}
