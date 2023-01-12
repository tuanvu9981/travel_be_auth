import { Injectable } from '@nestjs/common';
import { CreateDiscountInfoDto,UpdateDiscountInfoDto } from './dto/discount-info.dto';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscountInfo, DiscountInfoDocument } from './schema/discount-info.schema';

@Injectable()
export class DiscountInfoService {
  private readonly repo: Model<DiscountInfoDocument>;

  constructor(
    @InjectModel(DiscountInfo.name)
    repo: Model<DiscountInfoDocument>
  ) {
    this.repo = repo;
  }

  async create(dto: CreateDiscountInfoDto): Promise<DiscountInfoDocument> {
    const newDocument = new this.repo(dto);
    return await newDocument.save();
  }

  async findById(id: string): Promise<DiscountInfoDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findById(objId).exec();
  }

  async updateById(id: string, updateDto: UpdateDiscountInfoDto): Promise<DiscountInfoDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndUpdate(objId, updateDto, { new: true });
  }

  async deleteById(id: string): Promise<DiscountInfoDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndDelete(objId);
  }
}
