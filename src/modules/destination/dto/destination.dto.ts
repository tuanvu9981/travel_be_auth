import { Activity } from "../schema/activity.class";

export class CreateDestinationDto {
    imageUrl: string;
    city: string;
    country: string;
    description: string;
    activities: Activity[];
}

export class UpdateDestinationDto extends CreateDestinationDto {
    
}