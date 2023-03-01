import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";

export type DiscountInfoDocument = DiscountInfo & Document;

@Schema({ versionKey: false })
export class DiscountInfo {
    @Prop({ required: true, type: Date })
    startDate: Date;

    @Prop({ required: true, type: Date })
    endDate: Date;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    imageUrl: string;

    @Prop({ default: '' })
    instruction: string;

    @Prop({ default: '' })
    appliedPlace: string;

    @Prop({
        type: [{
            email: mongoose.Schema.Types.String,
            phone: mongoose.Schema.Types.String
        }]
    })
    contact: Object[];
}

export const DiscountInfoSchema = SchemaFactory.createForClass(DiscountInfo);