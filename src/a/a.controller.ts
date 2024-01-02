import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
  Headers,
} from '@nestjs/common';
import { AService } from './a.service';
import { CreateADto } from './dto/create-a.dto';
import { UpdateADto } from './dto/update-a.dto';
import { LoginGuard } from '../login/login.guard';
import { PermissionGuard } from '../permission/permission.guard';
@Controller('a')
export class AController {
  constructor(private readonly aService: AService) {}

  @UseGuards(LoginGuard)
  @UseGuards(PermissionGuard)
  @Post()
  create(@Body() createADto: CreateADto) {
    console.log('🚀 ~ file: a.cotroller.ts:13:', createADto);
    return this.aService.create(createADto);
  }

  @Get()
  findAll(@Session() value, @Headers() header) {
    const cookie = header.cookie;
    console.log(value, 'value');
    value[cookie] = value[cookie] ? value[cookie] + 1 : 1;
    return value[cookie];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateADto: UpdateADto) {
    return this.aService.update(+id, updateADto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aService.remove(+id);
  }
}
