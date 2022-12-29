import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingHistoryService } from './booking-history.service';
import { CreateBookingHistoryDto, UpdateBookingHistoryDto } from './dto/booking-history.dto';

@Controller('booking-history')
export class BookingHistoryController {
  constructor(private readonly bookingHistoryService: BookingHistoryService) {}

  @Post()
  create(@Body() createBookingHistoryDto: CreateBookingHistoryDto) {
    return this.bookingHistoryService.create(createBookingHistoryDto);
  }

  @Get()
  findAll() {
    return this.bookingHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingHistoryDto: UpdateBookingHistoryDto) {
    return this.bookingHistoryService.update(+id, updateBookingHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingHistoryService.remove(+id);
  }
}
