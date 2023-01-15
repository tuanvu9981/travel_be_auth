import { Date } from "mongoose";

export class CreateDiscountInfoDto {
    startDate: Date;
    endDate: Date;
    title: string;
    instruction: string;
    appliedPlace: string;
    imageUrl: string;
    contact: Object[];
}

export class UpdateDiscountInfoDto extends CreateDiscountInfoDto { }
