import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto, UpdateFoodDto } from './dto/food.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from 'src/common/constant/api.tags';
import { FoodDocument } from './schema/food.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags(API_TAG.FOOD)
@Controller('food')
export class FoodController {
  private readonly service: FoodService;
  constructor(service: FoodService) {
    this.service = service;
  }

  // @Post()
  // async create(
  //   @Res()
  //   response: any,

  //   @Body()
  //   createDto: CreateFoodDto
  // ): Promise<FoodDocument> {
  //   const document = await this.service.create(createDto);
  //   return response.status(HttpStatus.CREATED).json({
  //     status: HttpStatus.CREATED,
  //     data: document
  //   })
  // }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findByDestinationId(
    @Res()
    response: any,

    @Param('id')
    id: string
  ): Promise<FoodDocument[]> {
    const documents = await this.service.findByDestinationId(id);
    return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: documents
    })
  }

  // @Put(':id')
  // async updateById(
  //   @Res()
  //   response: any,

  //   @Param('id')
  //   id: string,

  //   @Body()
  //   updateDto: UpdateFoodDto) {
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
  // ): Promise<FoodDocument> {
  //   const document = await this.service.deleteById(id);
  //   return response.status(HttpStatus.OK).json({
  //     status: HttpStatus.OK,
  //     data: document
  //   })
  // }
}
