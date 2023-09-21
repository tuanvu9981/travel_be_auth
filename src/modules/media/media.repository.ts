import { BaseRepository } from "src/base.repository";
import { Media } from "./media.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class MediaRepository extends BaseRepository<Media>{
    constructor(
        @InjectModel(Media.name)
        private readonly mediaModel: Model<Media>,
    ) {
        super(mediaModel);
    }
}

