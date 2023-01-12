import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { USER_RESPONSE_CODES } from 'src/common/enum/enum.user';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
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
    const newDocument = new this.repo(createDto);
    return await newDocument.save();
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
    const objId = new mongoose.Schema.Types.ObjectId(id);
    return await this.repo.findById(objId).exec();
  }
}
