import { Module } from '@nestjs/common';
import { DestinationModule } from './modules/destination/destination.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config/config.db';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodModule } from './modules/food/food.module';
import { UserModule } from './modules/user/user.module';
import { DiscountInfoModule } from './modules/discount-info/discount-info.module';
import { BookingHistoryModule } from './modules/booking-history/booking-history.module';
import { AuthModule } from './modules/auth/auth.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: By default, nestjs will find .env file in root directory
      load: [getConfig],
      // list of ConfigObject containing environtment file list
    }),
    MongooseModule.forRoot(getConfig().URI),
    DestinationModule,
    HotelModule,
    FoodModule,
    UserModule,
    DiscountInfoModule,
    BookingHistoryModule,
    AuthModule,
    ActivityModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
