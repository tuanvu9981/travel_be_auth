import { Module } from '@nestjs/common';
import { DiscountInfoService } from './discount-info.service';
import { DiscountInfoController } from './discount-info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountInfo, DiscountInfoSchema } from './schema/discount-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: DiscountInfo.name, schema: DiscountInfoSchema
    }])
  ],
  controllers: [DiscountInfoController],
  providers: [
    DiscountInfoService
  ]
})
export class DiscountInfoModule {}
