import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { REFRESH_TOKEN_JWT } from "src/common/constant/jwt.const";
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: REFRESH_TOKEN_JWT.KEY,
            passReqToCallback: true
        });
    }

    validate(req: Request, payload: any){
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        // 'Bearer <token>' -> ' token' -> 'token' (after trimmed)
        return { id: payload.id, refreshToken };
    }
}