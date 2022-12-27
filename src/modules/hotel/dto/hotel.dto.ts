export class CreateHotelDto {
    imageUrl: string;
    name: string;
    address: string;   
    price: number;
}

export class UpdateHotelDto extends CreateHotelDto { }