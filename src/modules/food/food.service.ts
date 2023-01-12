import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateFoodDto, UpdateFoodDto } from './dto/food.dto';
import { Food, FoodDocument } from './schema/food.schema';

@Injectable()
export class FoodService {
  private readonly repo: Model<FoodDocument>;

  constructor(
    @InjectModel(Food.name)
    repo: Model<FoodDocument>
  ) {
    this.repo = repo;
  }

  async create(dto: CreateFoodDto): Promise<FoodDocument> {
    const newDocument = new this.repo(dto);
    return await newDocument.save();
  }

  async findById(id: string): Promise<FoodDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findById(objId).exec();
  }

  async updateById(id: string, updateDto: UpdateFoodDto): Promise<FoodDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndUpdate(objId, updateDto, { new: true });
  }

  async deleteById(id: string): Promise<FoodDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndDelete(objId);
  }
}
