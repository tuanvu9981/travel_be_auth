import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false })
export class Media extends Document {
    @Prop()
    name: string;

    @Prop()
    fileName: string;

    @Prop({ default: 'aws-s3' })
    serviceName: string;

    @Prop()
    mimeType: string;

    @Prop({ default: 0 })
    size: number;

    @Prop()
    key: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);