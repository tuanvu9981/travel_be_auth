import { Controller, Get, Post, Body, Put, HttpStatus, Res, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from 'src/common/constant/api.tags';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { BookingHistoryService } from './booking-history.service';
import { CreateBookingHistoryDto, UpdateBookingHistoryDto } from './dto/booking-history.dto';
import { BookingHistoryDocument } from './schema/booking-history.schema';

@ApiTags(API_TAG.BOOKING_HISTORY)
@Controller('booking-history')
export class BookingHistoryController {
  private readonly service: BookingHistoryService;
  constructor(service: BookingHistoryService) {
    this.service = service;
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Res()
    response: any,

    @Body()
    createDto: CreateBookingHistoryDto
  ): Promise<BookingHistoryDocument> {
    const document = await this.service.create(createDto);
    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: document
    })
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async findByUserId(
    @Res()
    response: any,

    @Param('id')
    id: string
  ): Promise<BookingHistoryDocument> {
    const document = await this.service.findById(id);
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: document
    })
  }

  // @UseGuards(AccessTokenGuard)
  // @Put(':id')
  // async updateById(
  //   @Res()
  //   response: any,

  //   @Param('id')
  //   id: string,

  //   @Body()
  //   updateDto: UpdateBookingHistoryDto) {
  //   const document = await this.service.updateById(id, updateDto);
  //   return response.status(HttpStatus.OK).json({
  //     status: HttpStatus.OK,
  //     data: document
  //   })
  // }
  
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deleteById(
    @Res()
    response: any,

    @Param('id')
    id: string
  ): Promise<BookingHistoryDocument> {
    const document = await this.service.deleteById(id);
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: document
    })
  }
}
