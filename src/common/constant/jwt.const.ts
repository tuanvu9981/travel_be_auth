import { SetMetadata } from "@nestjs/common";

export const ACCESS_TOKEN_JWT = {
    KEY: "ACCESS_TOKEN_TRAVEL_APP",
    EXPIRE: '15m'
}

export const REFRESH_TOKEN_JWT = {
    KEY: "REFRESH_TOKEN_TRAVEL_APP",
    EXPIRE: '2d'
}
// env

export type TokenType = {
    accessToken: string;
    refreshToken: string;
}