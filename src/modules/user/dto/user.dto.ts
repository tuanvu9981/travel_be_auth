import { USER_RESPONSE_CODES, USER_ROLE } from "src/common/enum/enum.user";
import { UserDocument } from "../schema/user.schema";

// CLASS VALIDATOR 

export class AuthPayload {
    email: string;
    fullname: string;
    avatarUrl: string;
    role: USER_ROLE;
    money: number;
}

export class CreateUserDto extends AuthPayload {
    password: string;
}

export class UpdateUserDto extends CreateUserDto {

}

export class UserAuthDto {
    email: string;
    password: string;
}

export class UserResponseDto {
    responseCode: USER_RESPONSE_CODES;
    data: UserDocument;

    constructor(responseCode: USER_RESPONSE_CODES, data: UserDocument) {
        this.responseCode = responseCode;
        this.data = data;
    }
}
