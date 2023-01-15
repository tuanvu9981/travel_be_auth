import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { USER_ROLE } from "src/common/enum/enum.user";

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    fullname: string;

    @Prop({ default: '' })
    avatarUrl: string

    @Prop({ default: USER_ROLE.CUSTOMER, enum: USER_ROLE })
    role: USER_ROLE;

    @Prop({ default: 1000000 })
    money: number;

    // @Prop({ default: [] })
    // whiteList: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
