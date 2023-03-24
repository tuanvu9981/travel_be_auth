import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BookingHistory } from './schema/booking-history.schema';
import { BookingHistoryDocument } from './schema/booking-history.schema';
import { Model } from 'mongoose';
import { CreateBookingHistoryDto } from './dto/booking-history.dto';
import { History } from './schema/history.entity';

@Injectable()
export class BookingHistoryService {
  private readonly repo: Model<BookingHistoryDocument>;
  constructor(
    @InjectModel(BookingHistory.name)
    repo: Model<BookingHistoryDocument>
  ) {
    this.repo = repo;
  }

  async create(createDto: CreateBookingHistoryDto): Promise<BookingHistoryDocument> {
    const newDocument = new this.repo(createDto);
    return newDocument.save();
  }

  // async findPerPage(pageNumber: number): Promise<BookingHistoryDocument[]> {

  // }

  async findById(id: string): Promise<BookingHistoryDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findById(objId).exec();
  }

  async updateById(id: string, updateDto: History): Promise<BookingHistoryDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    const document = await this.repo.findById(objId);
    document.histories.push(updateDto);
    return await this.repo.findByIdAndUpdate(objId, document, { new: true });
  }

  async deleteById(id: string): Promise<BookingHistoryDocument> {
    const objId = new mongoose.Types.ObjectId(id);
    return await this.repo.findByIdAndDelete(objId);
  }
}
