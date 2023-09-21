import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Media, MediaSchema } from "./media.schema";
import { MediaController } from "./media.controller";
import { BaseStorageService } from "./interface/file-storage";
import { S3Service } from "./aws-s3/aws-s3.service";
import { MediaRepository } from "./media.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Media.name, schema: MediaSchema
        }])
    ],
    controllers: [MediaController],
    providers: [
        MediaRepository,
        {
            provide: BaseStorageService,
            useClass: S3Service
        }
    ],
    exports: [MediaRepository]
})
export class MediaModule { }