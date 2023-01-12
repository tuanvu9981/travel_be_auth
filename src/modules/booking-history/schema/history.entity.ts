import { Date, ObjectId } from "mongoose";

export class History {
    place: {
        hotelId?: ObjectId;
        hotelName: string;
        room: string;
    };
    bookingDate: Date;
    deposit: number;
    checkInDate: Date;
    checkoutDate: Date;
}