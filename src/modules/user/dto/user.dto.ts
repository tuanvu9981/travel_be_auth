import { USER_ROLE } from "src/common/enum/enum.user";
import { UserDocument } from "../schema/user.schema";

export class CreateUserDto {
    email: string;
    fullname: string;
    password: string;
    role: USER_ROLE;
    refreshToken: string;
}

export class UpdateUserDto extends CreateUserDto { }


export class UserResponseDto {
    message: string;
    data: UserDocument;

    constructor(message: string, data: UserDocument) {
        this.message = message;
        this.data = data;
    }
}

export class RegenerateDto {
    userId: string;
    refreshToken: string;
}

export class ProfileDto {
    id: string;
    email: string;
    fullname: string;
    role: USER_ROLE;
    avatarUrl: string;
    money: number;
}
