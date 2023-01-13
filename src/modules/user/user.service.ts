import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { USER_RESPONSE_CODES } from 'src/common/enum/enum.user';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
// import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

// FAKE
export type User = any;

@Injectable()
export class UserService {

  private readonly users = [
    {
      userId: 1,
      email: 'tuan@gmail.com',
      password: 'tuanvu',
      avatarUrl: 'https://iimage/ava1.png'
    },
    {
      userId: 2,
      email: 'angiu@gmail.com',
      password: 'angiu',
      avatarUrl: 'https://iimage/ava2.png'
    },
    {
      userId: 3,
      email: 'user123@gmail.com',
      password: 'user123',
      avatarUrl: 'https://iimage/ava3.png'
    }
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  // private readonly repo: Model<UserDocument>;
  // constructor(
  //   @InjectModel(User.name)
  //   repo: Model<UserDocument>
  // ) {
  //   this.repo = repo;
  // }

  // async create(createDto: CreateUserDto): Promise<UserDocument> {
  //   const newDocument = new this.repo(createDto);
  //   return await newDocument.save();
  // }

  // async findByEmail(email: string): Promise<UserResponseDto> {
  //   const users = await this.repo.find({ email: email }).exec();
  //   if (users.length === 0) {
  //     return new UserResponseDto(USER_RESPONSE_CODES.NOT_FOUND, null);
  //   }
  //   if (users.length === 1) {
  //     return new UserResponseDto(USER_RESPONSE_CODES.EXISTED, users[0]);
  //   }
  // }

  // async findById(id: string): Promise<UserDocument> {
  //   const objId = new mongoose.Schema.Types.ObjectId(id);
  //   return await this.repo.findById(objId).exec();
  // }
}
