import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateHotelDto, UpdateHotelDto } from './dto/hotel.dto';
import { Hotel, HotelDocument } from './schema/hotel.entity';

const HOTEL_PER_PAGE: number = 10;

@Injectable()
export class HotelService {
  private readonly repo: Model<HotelDocument>;
  constructor(
    @InjectModel(Hotel.name)
    repo: Model<HotelDocument>
  ) {
    this.repo = repo;
  }

  async create(createDto: CreateHotelDto): Promise<HotelDocument> {
    const newDocument = new this.repo(createDto);
    return newDocument.save();
  }

  // async findPerPage(pageNumber: number): Promise<HotelDocument[]> {

  // }

  async findById(id: string): Promise<HotelDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findById(objId).exec();
  }

  async updateById(id: string, updateDto: UpdateHotelDto): Promise<HotelDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndUpdate(objId, updateDto, { new: true });
  }

  async deleteById(id: string): Promise<HotelDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndDelete(objId);
  }
}
