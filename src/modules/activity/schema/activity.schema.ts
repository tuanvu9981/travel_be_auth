import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ActivityDocument = Activity & Document;

@Schema({ versionKey: false })
export class Activity {
    @Prop()
    imageUrl: string;

    @Prop()
    name: string;

    @Prop()
    type: string;

    @Prop()
    startTimes: string[];

    @Prop()
    rating: number;

    @Prop()
    price: number;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
