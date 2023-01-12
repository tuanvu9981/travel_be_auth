import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto, UpdateDestinationDto } from './dto/destination.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from 'src/common/constant/api.tags';
import { DestinationDocument } from './schema/destination.schema';

@ApiTags(API_TAG.DESTINATION)
@Controller('destination')
export class DestinationController {
  private readonly service: DestinationService;
  constructor(service: DestinationService) {
    this.service = service;
  }

  @Post()
  async create(
    @Res()
    response: any,

    @Body()
    createDto: CreateDestinationDto
  ): Promise<DestinationDocument> {
    const document = await this.service.create(createDto);
    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: document
    })
  }

  // @Get(':pageNumber')
  // async findPerPage(
  //   @Res()
  //   response: any,

  //   @Param('pageNumber')
  //   pageNumber: string
  // ): Promise<DestinationDocument[]> {
  //   const documents = await this.service.findPerPage(+pageNumber);
  //   return response.status(HttpStatus.OK).json({
  //     status: HttpStatus.OK,
  //     data: documents
  //   })
  // }

  @Get(':id')
  async findById(
    @Res()
    response: any,

    @Param('id')
    id: string
  ): Promise<DestinationDocument> {
    const document = await this.service.findById(id);
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: document
    })
  }

  @Put(':id')
  async updateById(
    @Res()
    response: any,

    @Param('id')
    id: string,

    @Body()
    updateDto: UpdateDestinationDto) {
    const document = await this.service.updateById(id, updateDto);
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: document
    })
  }

  @Delete(':id')
  async deleteById(
    @Res()
    response: any,

    @Param('id')
    id: string
  ): Promise<DestinationDocument> {
    const document = await this.service.deleteById(id);
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: document
    })
  }
}
