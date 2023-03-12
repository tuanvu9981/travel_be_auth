import { Module } from '@nestjs/common';
import { DiscountInfoService } from './discount-info.service';
import { DiscountInfoController } from './discount-info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountInfo, DiscountInfoSchema } from './schema/discount-info.schema';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: DiscountInfo.name, schema: DiscountInfoSchema
    }])
  ],
  controllers: [DiscountInfoController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // },
    DiscountInfoService
  ]
})
export class DiscountInfoModule {}
