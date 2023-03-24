import mongoose, { ObjectId } from "mongoose";
import { History } from "../schema/history.entity";

export class CreateBookingHistoryDto {
    userId: mongoose.Types.ObjectId;
    histories: History[];
}