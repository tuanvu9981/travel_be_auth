// nestjs
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

// passport-jwt
import { Strategy, ExtractJwt } from "passport-jwt";

// constant
import { JWT } from "src/common/constant/jwt.const";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT.KEY,
        })
    }

    async validate(payload: any) {
        return {
            id: payload.id,
        }
    }
}