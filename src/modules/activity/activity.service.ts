import { Injectable } from '@nestjs/common';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './schema/activity.schema';

@Injectable()
export class ActivityService {
  private readonly repo: Model<ActivityDocument>;

  constructor(
    @InjectModel(Activity.name)
    repo: Model<ActivityDocument>
  ) {
    this.repo = repo;
  }

  async create(dto: CreateActivityDto): Promise<ActivityDocument> {
    const newDocument = new this.repo(dto);
    return await newDocument.save();
  }

  async findById(id: string): Promise<ActivityDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findById(objId).exec();
  }

  async updateById(id: string, updateDto: UpdateActivityDto): Promise<ActivityDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndUpdate(objId, updateDto, { new: true });
  }

  async deleteById(id: string): Promise<ActivityDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndDelete(objId);
  }
}
