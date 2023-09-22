import { Body, Controller, Delete, Get, Put, Query } from "@nestjs/common";
import { BaseStorageService } from "./interface/file-storage";

@Controller('media')
export class MediaController {

    constructor(private readonly service: BaseStorageService) { }

    @Put('update-acl')
    async updateACL(@Body('mediaId') mediaId: string) {
        const mediaUrl = await this.service.updateACL(mediaId);
        return { mediaUrl: mediaUrl };
    }

    @Delete('delete-file')
    async delete(@Query('mediaId') mediaId: string) {
        await this.service.deleteFile(mediaId);
        return true;
    }

    // get link of private file
    @Get('access-private-file')
    async getLinkAccess(@Query('key') key: string) {
        const url = this.service.getLinkMediaKey(key);
        return {
            url: url,
        };
    }
}