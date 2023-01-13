import { SetMetadata } from "@nestjs/common";

export const JWT = {
    KEY: "JWT_KEY_TRAVEL_APP",
    EXPIRE: '6m'
}
// env

// export const IS_PUBLIC = 'public_route';
// export const Public = () => SetMetadata(IS_PUBLIC, true);