import { Module } from '@nestjs/common';
import { DestinationModule } from './modules/destination/destination.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config/config.db';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/env/.${process.env.NODE_ENV}.env`,
      load: [getConfig],
      // list of ConfigObject containing environtment file list
    }),
    MongooseModule.forRoot(getConfig().URI),
    DestinationModule,
    HotelModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
