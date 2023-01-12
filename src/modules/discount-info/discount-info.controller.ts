import { Controller, Get, Post, Res, Body, Put, Param, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from 'src/common/constant/api.tags';
import { DiscountInfoService } from './discount-info.service';
import { CreateDiscountInfoDto, UpdateDiscountInfoDto } from './dto/discount-info.dto';
import { DiscountInfoDocument } from './schema/discount-info.schema';

@ApiTags(API_TAG.DISCOUNT_INFO)
@Controller('discount-info')
export class DiscountInfoController {
  private readonly service: DiscountInfoService;
  constructor(service: DiscountInfoService) {
    this.service = service;
  }

  @Post()
  async create(
    @Res()
    response: any,

    @Body()
    createDto: CreateDiscountInfoDto
  ): Promise<DiscountInfoDocument> {
    const document = await this.service.create(createDto);
    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: document
    })
  }

  @Get(':id')
  async findById(
    @Res()
    response: any,

    @Param('id')
    id: string
  ): Promise<DiscountInfoDocument> {
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
    updateDto: UpdateDiscountInfoDto) {
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
  ): Promise<DiscountInfoDocument> {
    const document = await this.service.deleteById(id);
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: document
    })
  }
}
