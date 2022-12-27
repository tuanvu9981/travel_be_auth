import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel, HotelDocument } from './schema/hotel.entity';

@Injectable()
export class HotelService {
  private readonly repo: Model<HotelDocument>;
  constructor(
    @InjectModel(Hotel.name)
    repo: Model<HotelDocument>
  ) {
    this.repo = repo;
  }

  // async create(newObj: CreateHotelDto): Promise<ChapterDocument> {
  //   const newDocument = new this.model(newViewInfo);
  //   return newDocument.save();
  // }

  create(createHotelDto: CreateHotelDto) {
    return 'This action adds a new hotel';
  }

  findAll() {
    return `This action returns all hotel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotel`;
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
