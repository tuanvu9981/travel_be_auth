import { Injectable } from '@nestjs/common';
import { CreateDiscountInfoDto,UpdateDiscountInfoDto } from './dto/discount-info.dto';

@Injectable()
export class DiscountInfoService {
  create(createDiscountInfoDto: CreateDiscountInfoDto) {
    return 'This action adds a new discountInfo';
  }

  findAll() {
    return `This action returns all discountInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discountInfo`;
  }

  update(id: number, updateDiscountInfoDto: UpdateDiscountInfoDto) {
    return `This action updates a #${id} discountInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} discountInfo`;
  }
}
