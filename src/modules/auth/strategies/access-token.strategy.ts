// nestjs
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

// passport-jwt
import { Strategy, ExtractJwt } from "passport-jwt";

// constant
import { ACCESS_TOKEN_JWT } from "src/common/constant/jwt.const";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ACCESS_TOKEN_JWT.KEY,
        })
    }

    async validate(payload: any) {
        return {
            id: payload.id,
        }
    }
}