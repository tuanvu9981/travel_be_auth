import { Date } from "mongoose";
import { ROOM_LEVEL, ROOM_STATUS } from "src/common/enum/enum.hotel";

export class Floor {
    floor?: number;
    rooms: Room[];
}

export class Room {
    roomId: string;
    status: ROOM_STATUS;
    level?: ROOM_LEVEL;
    intendedCheckinTime?: Date; // thời gian nhận phòng dự kiến
    intendedCheckoutTime?: Date; // thời gian trả phòng dự kiến
}