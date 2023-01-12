import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JWT } from "src/common/constant/jwt.const";
import { AuthPayload } from "src/modules/user/dto/user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT.KEY,
        })
    }

    async validate(payload: AuthPayload) {
        return payload;
    }
}