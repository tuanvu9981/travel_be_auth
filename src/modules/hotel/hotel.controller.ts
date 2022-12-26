import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from 'src/common/constant/api.tags';

@ApiTags(API_TAG.HOTELS)
@Controller('hotel')
export class HotelController {
  private readonly service: HotelService;
  constructor(service: HotelService) {
    this.service = service;
  }

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.service.create(createHotelDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.service.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
