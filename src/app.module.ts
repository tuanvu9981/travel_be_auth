import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinationModule } from './destination/destination.module';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [DestinationModule, HotelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
