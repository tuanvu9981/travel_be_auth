// nestjs 
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

// passport-local
import { Strategy } from "passport-local";

// service and document
import { AuthService } from "../auth.service";
import { UserDocument } from "src/modules/user/schema/user.schema";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<UserDocument> {
        const user = await this.authService.authenticate(email, password);
        if (user == null) {
            throw new UnauthorizedException("Email or password is incorrect!");
        } 
        return user;
    }
}