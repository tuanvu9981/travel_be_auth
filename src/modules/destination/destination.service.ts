import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Destination, DestinationDocument } from './schema/destination.schema';

@Injectable()
export class DestinationService {
  private readonly repo: Model<DestinationDocument>;
  constructor(
    @InjectModel(Destination.name)
    repo: Model<DestinationDocument>
  ){
    this.repo = repo;
  }
  
  create(createDestinationDto: CreateDestinationDto) {
    return 'This action adds a new destination';
  }

  findAll() {
    return `This action returns all destination`;
  }

  findOne(id: number) {
    return `This action returns a #${id} destination`;
  }

  update(id: number, updateDestinationDto: UpdateDestinationDto) {
    return `This action updates a #${id} destination`;
  }

  remove(id: number) {
    return `This action removes a #${id} destination`;
  }
}
