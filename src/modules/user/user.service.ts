// nestjs & mongoose libraries
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';

// enum
import { USER_RESPONSE_CODES } from 'src/common/enum/enum.user';

// dto & schema
import { CreateUserDto, ReturnUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {

  private readonly repo: Model<UserDocument>;
  constructor(
    @InjectModel(User.name)
    repo: Model<UserDocument>
  ) {
    this.repo = repo;
  }

  async create(createDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.repo(createDto);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    const users = await this.repo.find({ email: email }).exec();
    if (users.length === 0) {
      return new UserResponseDto(USER_RESPONSE_CODES.NOT_FOUND, null);
    }
    if (users.length === 1) {
      return new UserResponseDto(USER_RESPONSE_CODES.EXISTED, users[0]);
    }
  }

  async findById(id: string): Promise<UserDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findById(objId).exec();
  }

  async updateById(id: string, newUser: UpdateUserDto): Promise<ReturnUserDto> {
    const objId = new mongoose.Types.ObjectId(id);
    const updatedUser = await this.repo.findByIdAndUpdate(objId, newUser, { new: true });
    return new ReturnUserDto(
      updatedUser.email, updatedUser.fullname,
      updatedUser.avatarUrl, updatedUser.role,
      updatedUser.money, updatedUser._id
    )
  }
}
