import { Module } from '@nestjs/common';
import { BookingHistoryService } from './booking-history.service';
import { BookingHistoryController } from './booking-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingHistory, BookingHistorySchema } from './schema/booking-history.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{
      name: BookingHistory.name, schema: BookingHistorySchema
    }])
  ],
  controllers: [BookingHistoryController],
  providers: [
    BookingHistoryService
  ]
})
export class BookingHistoryModule { }
