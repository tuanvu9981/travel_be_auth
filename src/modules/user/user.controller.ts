import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserAuthDto } from './dto/user.dto';
import { UserDocument } from './schema/user.schema';

@Controller('user')
export class UserController {
  private readonly service: UserService;
  constructor(service: UserService) {
    this.service = service;
  }

  // @Post()
  // async create(
  //   @Body()
  //   createDto: CreateUserDto
  // ): Promise<UserDocument | undefined> {
  //   return await this.service.create(createDto);
  // }

}
