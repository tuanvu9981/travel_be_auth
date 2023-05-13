import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { SYSTEM_LANGUAGE, USER_ROLE } from "src/common/enum/enum.user";

export type UserDocument = User & Document;

const defaultAvatarUrl = 'https://firebasestorage.googleapis.com/v0/b/fir-getx-flutter-bd7d8.appspot.com/o/default_user.jpg?alt=media&token=b24066c2-0b5b-480a-9a54-fd307d1078f1';

@Schema({ versionKey: false })
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    fullname: string;

    @Prop({ default: defaultAvatarUrl })
    avatarUrl: string

    @Prop({ default: USER_ROLE.CUSTOMER, enum: USER_ROLE })
    role: USER_ROLE;

    @Prop({ default: 1000000 })
    money: number;

    @Prop({ default: 'phone number not added yet' })
    phoneNumber: string;

    @Prop({ default: 'birthday not added yet' })
    birthday: string;

    @Prop()
    refreshToken: string;

    @Prop({ enum: SYSTEM_LANGUAGE, default: SYSTEM_LANGUAGE.ENGLISH })
    systemLanguage: SYSTEM_LANGUAGE;
}

export const UserSchema = SchemaFactory.createForClass(User);
