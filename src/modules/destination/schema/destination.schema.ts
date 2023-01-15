import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Activity } from "src/modules/activity/schema/activity.schema";
import { Hotel } from "src/modules/hotel/schema/hotel.schema";

export type DestinationDocument = Document & Destination;

@Schema({ versionKey: false })
export class Destination {
    @Prop({ required: true })
    imageUrl: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    country: string;

    @Prop()
    description: string;

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
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);