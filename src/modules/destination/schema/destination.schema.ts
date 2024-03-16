import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { MultipleLangString } from "src/common/constant/language.const";
import { Activity } from "src/modules/activity/schema/activity.schema";
import { Hotel } from "src/modules/hotel/schema/hotel.schema";

export type DestinationDocument = Document & Destination;

@Schema({ versionKey: false })
export class Destination {

    @Prop({ required: true, type: MultipleLangString })
    city: MultipleLangString;

    @Prop({ required: true, type: MultipleLangString })
    country: MultipleLangString;

    @Prop({ type: MultipleLangString })
    description: MultipleLangString;

    @Prop({
        default: [],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
    })
    activities: Activity[];

    @Prop({
        default: [],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }]
    })
    hotels: Hotel[];

    @Prop({ required: true })
    imageUrl: string;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);