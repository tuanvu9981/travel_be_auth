import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";
import { DefaultMultipleLangString, MultipleLangString } from "src/common/constant/language.const";

export type DiscountInfoDocument = DiscountInfo & Document;

@Schema({ versionKey: false })
export class DiscountInfo {

    @Prop({ required: true, type: Date })
    startDate: Date;

    @Prop({ required: true, type: Date })
    endDate: Date;

    @Prop({ required: true })
    imageUrl: string;

    @Prop({ required: true, type: MultipleLangString })
    title: MultipleLangString;

    @Prop({ type: MultipleLangString, default: DefaultMultipleLangString })
    instruction: MultipleLangString;

    @Prop({ type: MultipleLangString })
    appliedPlace: MultipleLangString;

    @Prop({
        type: [{
            email: mongoose.Schema.Types.String,
            phone: mongoose.Schema.Types.String
        }]
    })
    contact: Object[];
}

export const DiscountInfoSchema = SchemaFactory.createForClass(DiscountInfo);