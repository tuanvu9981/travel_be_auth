import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";

export type FoodDocument = Food & Document;

@Schema({ versionKey: false })
export class Food {
    @Prop()
    address: string;

    @Prop({ required: true })
    foodName: string;

    @Prop()
    imageUrl: string;

    @Prop()
    english: string;

    @Prop({ require: true })
    price: number;

    @Prop({ ref: 'Destination' })
    destinationId: ObjectId;
}

export const FoodSchema = SchemaFactory.createForClass(Food);