import { ObjectId } from "mongoose";
import { History } from "../schema/history.entity";

export class CreateBookingHistoryDto {
    userId: ObjectId;
    histories: History[];
}

export class UpdateBookingHistoryDto extends CreateBookingHistoryDto {}