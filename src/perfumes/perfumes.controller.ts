import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PerfumesService } from './perfumes.service';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';

@Controller('perfumes')
export class PerfumesController {
  constructor(private readonly perfumesService: PerfumesService) {}

  @Post()
  create(@Body() createPerfumeDto: CreatePerfumeDto) {
    return this.perfumesService.create(createPerfumeDto);
  }

  @Get()
  findAll(@Query('category') category?: string, @Query('isNew') isNew?: string) {
    if (category) return this.perfumesService.findByCategory(category);
    if (isNew === 'true') return this.perfumesService.findNew();
    return this.perfumesService.findAll();
  }
  // findAll() {
  //   return this.perfumesService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfumesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfumeDto: UpdatePerfumeDto) {
    return this.perfumesService.update(+id, updatePerfumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfumesService.remove(+id);
  }
}
