import { Floor, Room } from "../schema/room.entity";

export class CreateHotelDto {
    imageUrl: string;
    name: string;
    address: string;   
    price: number;
    floors: Floor[];
}

export class UpdateHotelDto extends CreateHotelDto { }