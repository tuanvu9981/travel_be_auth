import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateDestinationDto, UpdateDestinationDto } from './dto/destination.dto';
import { Destination, DestinationDocument } from './schema/destination.schema';

const DESTINATIONS_PER_PAGE: number = 10;

@Injectable()
export class DestinationService {
  private readonly repo: Model<DestinationDocument>;
  constructor(
    @InjectModel(Destination.name)
    repo: Model<DestinationDocument>
  ) {
    this.repo = repo;
  }

  async create(createDto: CreateDestinationDto): Promise<DestinationDocument> {
    const newDocument = new this.repo(createDto);
    return newDocument.save();
  }

  async findById(id: string): Promise<DestinationDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findById(objId).exec();
  }

  async updateById(id: string, updateDto: UpdateDestinationDto): Promise<DestinationDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndUpdate(objId, updateDto, { new: true });
  }

  async deleteById(id: string): Promise<DestinationDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndDelete(objId);
  }
}
