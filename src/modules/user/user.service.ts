// nestjs & mongoose libraries
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

// dto & schema
import { CreateUserDto, ProfileDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
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
      return new UserResponseDto("Email didnt existed", null);
    }
    if (users.length === 1) {
      return new UserResponseDto("One identical email existed", users[0]);
    }
  }

  async findById(id: string): Promise<UserDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findById(objId).exec();
  }

  convertDocumentToProfile(document: UserDocument): ProfileDto {
    const profile: ProfileDto = {
      id: document._id,
      email: document.email,
      fullname: document.fullname,
      role: document.role,
      money: document.money,
      avatarUrl: document.avatarUrl,
      phoneNumber: document.phoneNumber,
      birthday: document.birthday
    }
    return profile;
  }

  async updateById(id: string, newUser: UpdateUserDto): Promise<UserDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndUpdate(objId, newUser, { new: true });
  }
}
