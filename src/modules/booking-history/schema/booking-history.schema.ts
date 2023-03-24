import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { History } from "./history.entity";
import { Document } from "mongoose";

export type BookingHistoryDocument = BookingHistory & Document;

@Schema({ versionKey: false })
export class BookingHistory {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    userId: mongoose.Types.ObjectId;

    @Prop({ default: [] })
    histories: History[];
}

export const BookingHistorySchema = SchemaFactory.createForClass(BookingHistory);
