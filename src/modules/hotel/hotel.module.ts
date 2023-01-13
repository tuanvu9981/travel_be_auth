import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schema/hotel.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Hotel.name, schema: HotelSchema
    }])
  ],
  controllers: [HotelController],
  providers: [
    HotelService,
    // {
    //   provide: "APP_GUARD",
    //   useClass: JwtAuthGuard
    // }
  ]
})
export class HotelModule { }
