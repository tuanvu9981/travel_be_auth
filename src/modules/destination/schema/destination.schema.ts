import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Activity } from "./activity.class";

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

    @Prop({ default: [], })
    activities: Activity[]
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);