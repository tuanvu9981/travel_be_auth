// nestjs & mongoose libraries
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

// enum
import { USER_RESPONSE_CODES } from 'src/common/enum/enum.user';

// dto & schema
import { CreateUserDto, ReturnUserDto, UserResponseDto } from './dto/user.dto';
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

  async create(createDto: CreateUserDto): Promise<ReturnUserDto> {
    const newUser = new this.repo(createDto);
    const newDocument = await newUser.save();
    return new ReturnUserDto(
      newUser.email, newUser.fullname,
      newUser.avatarUrl, newUser.role,
      newUser.money, newUser._id
    );
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

  async findById(id: string): Promise<ReturnUserDto> {
    const objId = new mongoose.Types.ObjectId(id);
    const user = await this.repo.findById(objId).exec();
    return new ReturnUserDto(
      user.email, user.fullname,
      user.avatarUrl, user.role,
      user.money, user._id
    );
  }
}
