import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
import { MultipleLangString, DefaultMultipleLangString } from "src/common/constant/language.const";

export type FoodDocument = Food & Document;

@Schema({ versionKey: false })
export class Food {
    @Prop({ type: MultipleLangString, default: DefaultMultipleLangString })
    address: MultipleLangString;

    @Prop({ required: true, type: MultipleLangString, default: DefaultMultipleLangString })
    foodName: MultipleLangString;

    @Prop({ require: true, type: MultipleLangString, default: DefaultMultipleLangString })
    price: MultipleLangString;

    @Prop()
    imageUrl: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' })
    destinationId: ObjectId;
}

export const FoodSchema = SchemaFactory.createForClass(Food);