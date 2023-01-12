import { ObjectId } from "mongoose";

export class CreateDestinationDto {
    imageUrl: string;
    city: string;
    country: string;
    description: string;
    activities: ObjectId[];
}

export class UpdateDestinationDto extends CreateDestinationDto {

}