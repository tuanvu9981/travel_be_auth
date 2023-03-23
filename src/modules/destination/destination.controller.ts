import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto, UpdateDestinationDto } from './dto/destination.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from 'src/common/constant/api.tags';
import { DestinationDocument } from './schema/destination.schema';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiTags(API_TAG.DESTINATION)
@Controller('destination')
export class DestinationController {
  private readonly service: DestinationService;
  constructor(service: DestinationService) {
    this.service = service;
  }

  // @Post()
  // async create(
  //   @Res()
  //   response: any,

  //   @Body()
  //   createDto: CreateDestinationDto
  // ): Promise<DestinationDocument> {
  //   const document = await this.service.create(createDto);
  //   return response.status(HttpStatus.CREATED).json({
  //     status: HttpStatus.CREATED,
  //     data: document
  //   })
  // }

  @UseGuards(AccessTokenGuard)
  @Get('/top')
  async findTopDestinations(
    @Res()
    response: any,
  ): Promise<DestinationDocument[]> {
    const documents = await this.service.findTop();
    return response.status(HttpStatus.OK).json({ data: documents })
  }

  @UseGuards(AccessTokenGuard)
  @Get('/all')
  async findAll(
    @Res()
    response: any,
  ): Promise<DestinationDocument[]> {
    const documents = await this.service.findAll();
    return response.status(HttpStatus.OK).json({ data: documents })
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findById(
    @Res()
    response: any,

    @Param('id')
    id: string
  ): Promise<DestinationDocument> {
    const document = await this.service.findById(id);
    return response.status(HttpStatus.OK).json({ data: document })
  }

  // @Put(':id')
  // async updateById(
  //   @Res()
  //   response: any,

  //   @Param('id')
  //   id: string,

  //   @Body()
  //   updateDto: UpdateDestinationDto) {
  //   const document = await this.service.updateById(id, updateDto);
  //   return response.status(HttpStatus.OK).json({
  //     status: HttpStatus.OK,
  //     data: document
  //   })
  // }

  // @Delete(':id')
  // async deleteById(
  //   @Res()
  //   response: any,

  //   @Param('id')
  //   id: string
  // ): Promise<DestinationDocument> {
  //   const document = await this.service.deleteById(id);
  //   return response.status(HttpStatus.OK).json({
  //     status: HttpStatus.OK,
  //     data: document
  //   })
  // }
}
