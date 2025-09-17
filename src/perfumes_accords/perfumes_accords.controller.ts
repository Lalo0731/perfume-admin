import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerfumesAccordsService } from './perfumes_accords.service';
import { CreatePerfumesAccordDto } from './dto/create-perfumes_accord.dto';
import { UpdatePerfumesAccordDto } from './dto/update-perfumes_accord.dto';

@Controller('perfumes-accords')
export class PerfumesAccordsController {
  constructor(private readonly perfumesAccordsService: PerfumesAccordsService) {}

  @Post()
  create(@Body() createPerfumesAccordDto: CreatePerfumesAccordDto) {
    return this.perfumesAccordsService.create(createPerfumesAccordDto);
  }

  @Get()
  findAll() {
    return this.perfumesAccordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfumesAccordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfumesAccordDto: UpdatePerfumesAccordDto) {
    return this.perfumesAccordsService.update(+id, updatePerfumesAccordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfumesAccordsService.remove(+id);
  }
}
