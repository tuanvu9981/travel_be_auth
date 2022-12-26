import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schema/hotel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Hotel.name, schema: HotelSchema
    }])
  ],
  controllers: [HotelController],
  providers: [HotelService]
})
export class HotelModule { }
