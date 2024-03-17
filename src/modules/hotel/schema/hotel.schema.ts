import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Floor } from "./room.entity";
import { DefaultMultipleLangString, MultipleLangString } from "src/common/constant/language.const";

export type HotelDocument = Hotel & Document;

@Schema({ versionKey: false })
export class Hotel {

    @Prop({
        required: true,
        type: MultipleLangString,
        default: DefaultMultipleLangString
    })
    name: MultipleLangString;

    @Prop({
        required: true,
        type: MultipleLangString,
        default: DefaultMultipleLangString
    })
    address: MultipleLangString;

    @Prop({ type: MultipleLangString, default: DefaultMultipleLangString })
    price: MultipleLangString;

    @Prop({ required: true })
    imageUrl: string;

    @Prop({
        default: [],
        type: [{ type: Floor }]
    })
    floors: Floor[];
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
