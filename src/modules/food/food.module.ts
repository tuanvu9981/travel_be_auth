import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './schema/food.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Food.name, schema: FoodSchema
    }])
  ],
  controllers: [FoodController],
  providers: [
    FoodService
  ]
})
export class FoodModule { }
