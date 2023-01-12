import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";

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
    activityIds: ObjectId[];

    @Prop({
        default: [],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }]
    })
    hotelIds: ObjectId[];
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);