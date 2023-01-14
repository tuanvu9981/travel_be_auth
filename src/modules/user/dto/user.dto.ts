import { ObjectId } from "mongoose";
import { USER_RESPONSE_CODES, USER_ROLE } from "src/common/enum/enum.user";
import { UserDocument } from "../schema/user.schema";

// CLASS VALIDATOR 
export class BaseUser {
    email: string;
    fullname: string;
    avatarUrl: string;
    role: USER_ROLE;
    money: number;

    constructor(
        email: string,
        fullname: string,
        avatarUrl: string,
        role: USER_ROLE,
        money: number
    ) {
        this.email = email;
        this.fullname = fullname;
        this.avatarUrl = avatarUrl;
        this.role = role;
        this.money = money;
    }
}

export class CreateUserDto extends BaseUser {
    password: string;
    constructor(
        email: string,
        fullname: string,
        avatarUrl: string,
        role: USER_ROLE,
        money: number,
        password: string
    ) {
        super(email, fullname, avatarUrl, role, money);
        this.password = password;
    }
}

export class UpdateUserDto extends CreateUserDto { }

export class ReturnUserDto extends BaseUser {
    id: ObjectId;
    constructor(
        email: string,
        fullname: string,
        avatarUrl: string,
        role: USER_ROLE,
        money: number,
        id: ObjectId
    ) {
        super(email, fullname, avatarUrl, role, money);
        this.id = id;
    }
}

export class UserResponseDto {
    responseCode: USER_RESPONSE_CODES;
    data: UserDocument;

    constructor(responseCode: USER_RESPONSE_CODES, data: UserDocument) {
        this.responseCode = responseCode;
        this.data = data;
    }
}
