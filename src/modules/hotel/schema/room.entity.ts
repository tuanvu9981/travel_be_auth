import { Date } from "mongoose";
import { ROOM_LEVEL, ROOM_STATUS } from "src/common/enum/enum.hotel";

export class Room {
    roomId: string;
    status: ROOM_STATUS;
    floor?: number;
    level?: ROOM_LEVEL;
    intendedCheckinTime?: Date;
    // thời gian nhận phòng dự kiến
    intendedCheckoutTime?: Date;
    // thời gian trả phòng dự kiến
}