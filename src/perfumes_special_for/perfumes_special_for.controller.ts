import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerfumesSpecialForService } from './perfumes_special_for.service';
import { CreatePerfumesSpecialForDto } from './dto/create-perfumes_special_for.dto';
import { UpdatePerfumesSpecialForDto } from './dto/update-perfumes_special_for.dto';

@Controller('perfumes-special-for')
export class PerfumesSpecialForController {
  constructor(private readonly perfumesSpecialForService: PerfumesSpecialForService) {}

  @Post()
  create(@Body() createPerfumesSpecialForDto: CreatePerfumesSpecialForDto) {
    return this.perfumesSpecialForService.create(createPerfumesSpecialForDto);
  }

  @Get()
  findAll() {
    return this.perfumesSpecialForService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfumesSpecialForService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfumesSpecialForDto: UpdatePerfumesSpecialForDto) {
    return this.perfumesSpecialForService.update(+id, updatePerfumesSpecialForDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfumesSpecialForService.remove(+id);
  }
}
