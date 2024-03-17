import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { DefaultMultipleLangString, MultipleLangString } from "src/common/constant/language.const";

export type ActivityDocument = Activity & Document;

enum ACTIVITY_TYPE {
    SIGH_SEEING = "sigh_seeing",
    CULTURE_EXPERIENCE = "culture_experience",
    FOOD_TOUR = "food_tour",
    LOCAL_MARKET = "local_market",
    RELIGIOUS_PLACE = "religious_place"
}

@Schema({ versionKey: false })
export class Activity {

    @Prop({ type: MultipleLangString, default: DefaultMultipleLangString })
    price: MultipleLangString;

    @Prop({ type: MultipleLangString, default: DefaultMultipleLangString })
    name: MultipleLangString;

    @Prop({
        default: [],
        type: [{ type: String, enum: ACTIVITY_TYPE }]
    })
    type: string[];

    @Prop()
    imageUrl: string;

    @Prop()
    businessTime: string;

    @Prop()
    rating: number;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
