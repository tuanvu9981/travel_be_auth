import { ObjectId } from "mongoose";

export class CreateFoodDto {
    address: string;
    foodName: string;
    imageUrl: string;
    english?: string;
    price: number;
    destinationId?: ObjectId;
}

export class UpdateFoodDto extends CreateFoodDto { }
