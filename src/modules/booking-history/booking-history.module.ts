import { Module } from '@nestjs/common';
import { BookingHistoryService } from './booking-history.service';
import { BookingHistoryController } from './booking-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingHistory, BookingHistorySchema } from './schema/booking-history.schema';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: BookingHistory.name, schema: BookingHistorySchema
    }])
  ],
  controllers: [BookingHistoryController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // },
    BookingHistoryService
  ]
})
export class BookingHistoryModule { }
