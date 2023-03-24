import { Controller, Get, Post, Body, Put, HttpStatus, Res, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from 'src/common/constant/api.tags';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { BookingHistoryService } from './booking-history.service';
import { History } from './schema/history.entity';
import mongoose from 'mongoose';

@ApiTags(API_TAG.BOOKING_HISTORY)
@Controller('booking-history')
export class BookingHistoryController {
  private readonly service: BookingHistoryService;
  constructor(service: BookingHistoryService) {
    this.service = service;
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async createUserBookingHistory(
    @Res()
    response: any,

    @Req()
    request: any
  ) {
    const { id } = request.user;
    const objId = new mongoose.Types.ObjectId(id);
    const document = await this.service.create({ userId: objId, histories: [] });
    return response.status(HttpStatus.CREATED).json({ data: document })
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async findByUserId(
    @Res()
    response: any,

    @Req()
    request: any,
  ) {
    const { id } = request.user;
    const document = await this.service.findByUserId(id);
    return response.status(HttpStatus.OK).json({ data: document })
  }

  @UseGuards(AccessTokenGuard)
  @Put()
  async updateByUserId(
    @Res()
    response: any,

    @Req()
    request: any,

    @Body()
    updateDto: History
  ) {
    const { id } = request.user;
    const document = await this.service.updateByUserId(id, updateDto);
    return response.status(HttpStatus.OK).json({ data: document })
  }

  // @UseGuards(AccessTokenGuard)
  // @Delete(':id')
  // async deleteById(
  //   @Res()
  //   response: any,

  //   @Param('id')
  //   id: string
  // ): Promise<BookingHistoryDocument> {
  //   const document = await this.service.deleteById(id);
  //   return response.status(HttpStatus.OK).json({
  //     status: HttpStatus.OK,
  //     data: document
  //   })
  // }
}
