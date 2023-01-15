import { Room } from "../schema/room.entity";

export class CreateHotelDto {
    imageUrl: string;
    name: string;
    address: string;   
    price: number;
    rooms: Room[];
}

export class UpdateHotelDto extends CreateHotelDto { }