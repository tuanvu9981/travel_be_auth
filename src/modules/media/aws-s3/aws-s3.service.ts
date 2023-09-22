import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";

import { ObjectId, Types } from "mongoose";
import { getConfig } from "src/config/config.db";
import { MediaRepository } from "../media.repository";
import { Media } from "../media.schema";
import { BaseStorageService } from "../interface/file-storage";

@Injectable()
export class S3Service extends BaseStorageService {
    constructor(private readonly mediaRepo: MediaRepository) {
        super();
    }

    getLinkMediaKey(mediaKey: string): string {
        const s3 = this.getInstance();
        return s3.getSignedUrl('getObject', {
            Key: mediaKey,
            Bucket: getConfig().AWS_PUBLIC_BUCKET,
            Expires: 60 * 60 * 12 // 12 hours
        });
    }

    getInstance(): S3 {
        return new S3({
            region: getConfig().AWS_REGION,
            accessKeyId: getConfig().AWS_ACCESS_KEY,
            secretAccessKey: getConfig().AWS_SECRET_KEY
        });
    }

    async updateACL(mediaId: string | ObjectId): Promise<string> {
        // change Access Control List (ACL)
        const media = await this.mediaRepo.findById(mediaId);
        const s3 = this.getInstance();
        s3.putObjectAcl(
            {
                Bucket: getConfig().AWS_PUBLIC_BUCKET,
                Key: media.key,
                ACL: 'public-read' // allow anyone to read
            },
            (err, data) => { }
        );
        return `${s3.endpoint.protocol}//${getConfig().AWS_PUBLIC_BUCKET}.${s3.endpoint.hostname}/${media.key}`;
    }

    async uploadFile(file: Express.Multer.File): Promise<Media> {
        const objectId = new Types.ObjectId();
        const arrayName = file.originalname.split('.'); // picture.img --> ['picture', 'img'];

        const key = `${objectId}/${this.slug(arrayName[0])}.${arrayName[1]}`;
        const data = {
            _id: objectId,
            name: arrayName[0],
            fileName: String(file.originalname),
            mimeType: file.mimetype,
            size: file.size,
            key: key,
            serviceName: 'aws-s3'
        };
        await this.uploadToStorage(file.buffer, key, file.mimetype)
        return await this.mediaRepo.create(data);
    }


    private async uploadToStorage(fileBuffer: Buffer, key: string, contentType: string) {
        const s3 = this.getInstance();
        const params = {
            Bucket: getConfig().AWS_PUBLIC_BUCKET,
            Key: key,
            Body: fileBuffer,
            ContentType: contentType,
            // ACL: 'public-read' 
            // private file --> remove this
        }

        return new Promise((resolve, reject) => {
            s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
                if (err) {
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }

    async deleteFile(mediaId: string | ObjectId): Promise<boolean>{
        const media = await this.mediaRepo.findById(mediaId);
        const s3 = this.getInstance();
        const params = {
            Bucket: getConfig().AWS_PUBLIC_BUCKET,
            Key: media.key,
        };
        s3.deleteObject(params, (err, data) => {});
        await media.remove();
        return true;
    }
}