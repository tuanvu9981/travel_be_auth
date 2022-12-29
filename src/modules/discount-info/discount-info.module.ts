import { Module } from '@nestjs/common';
import { DiscountInfoService } from './discount-info.service';
import { DiscountInfoController } from './discount-info.controller';

@Module({
  controllers: [DiscountInfoController],
  providers: [DiscountInfoService]
})
export class DiscountInfoModule {}
