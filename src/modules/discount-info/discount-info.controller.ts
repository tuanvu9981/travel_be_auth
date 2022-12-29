import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountInfoService } from './discount-info.service';
import { CreateDiscountInfoDto, UpdateDiscountInfoDto } from './dto/discount-info.dto';

@Controller('discount-info')
export class DiscountInfoController {
  constructor(private readonly discountInfoService: DiscountInfoService) {}

  @Post()
  create(@Body() createDiscountInfoDto: CreateDiscountInfoDto) {
    return this.discountInfoService.create(createDiscountInfoDto);
  }

  @Get()
  findAll() {
    return this.discountInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountInfoDto: UpdateDiscountInfoDto) {
    return this.discountInfoService.update(+id, updateDiscountInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountInfoService.remove(+id);
  }
}
