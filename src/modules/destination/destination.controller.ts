import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from 'src/common/constant/api.tags';

@ApiTags(API_TAG.DESTINATIONS)
@Controller('destination')
export class DestinationController {
  private readonly service: DestinationService;
  constructor(service: DestinationService) {
    this.service = service;
  }

  @Post()
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.service.create(createDestinationDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDestinationDto: UpdateDestinationDto) {
    return this.service.update(+id, updateDestinationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
