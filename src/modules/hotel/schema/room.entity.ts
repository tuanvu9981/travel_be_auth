import { Date } from "mongoose";
import { ROOM_STATUS } from "src/common/enum/enum.hotel";

export class Room {
    roomId: string;
    status: ROOM_STATUS;
    floor?: number;
    level?: string;
    intendedCheckinTime?: Date;
    // thời gian nhận phòng dự kiến
    intendedCheckoutTime?: Date;
    // thời gian trả phòng dự kiến
}