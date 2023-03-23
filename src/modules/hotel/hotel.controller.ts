import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto, UpdateHotelDto } from './dto/hotel.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from 'src/common/constant/api.tags';
import { HotelDocument } from './schema/hotel.schema';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiTags(API_TAG.HOTEL)
@Controller('hotel')
export class HotelController {
  private readonly service: HotelService;
  constructor(service: HotelService) {
    this.service = service;
  }

  // @Post()
  // async create(
  //   @Res()
  //   response: any,

  //   @Body()
  //   createDto: CreateHotelDto
  // ): Promise<HotelDocument> {
  //   const document = await this.service.create(createDto);
  //   return response.status(HttpStatus.CREATED).json({
  //     status: HttpStatus.CREATED,
  //     data: document
  //   })
  // }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findById(
    @Res()
    response: any,

    @Param('id')
    id: string
  ): Promise<HotelDocument> {
    const document = await this.service.findById(id);
    return response.status(HttpStatus.OK).json({ data: document })
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async updateById(
    @Res()
    response: any,

    @Param('id')
    id: string,

    @Body()
    updateDto: UpdateHotelDto
  ): Promise<HotelDocument> {
    const document = await this.service.updateById(id, updateDto);
    return response.status(HttpStatus.OK).json({ data: document })
  }

  // @Delete(':id')
  // async deleteById(
  //   @Res()
  //   response: any,

  //   @Param('id')
  //   id: string
  // ): Promise<HotelDocument> {
  //   const document = await this.service.deleteById(id);
  //   return response.status(HttpStatus.OK).json({
  //     status: HttpStatus.OK,
  //     data: document
  //   })
  // }
}
