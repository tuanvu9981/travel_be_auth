import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type HotelDocument = Hotel & Document;

@Schema({ versionKey: false })
export class Hotel {
    @Prop({ required: true })
    imageUrl: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: string;

    @Prop()
    price: number;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
