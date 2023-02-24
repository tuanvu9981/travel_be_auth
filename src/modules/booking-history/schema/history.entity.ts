import { Date, ObjectId } from "mongoose";

export class History {
    hotelImgUrl: string;
    hotelName: string;
    hotelAddress: string;
    roomId: string;
    roomLevel: string;
    bookingDate: Date;
    checkInDate: Date;
    checkOutDate: Date;
}