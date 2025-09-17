import { Injectable } from '@nestjs/common';
import { CreatePerfumesAccordDto } from './dto/create-perfumes_accord.dto';
import { UpdatePerfumesAccordDto } from './dto/update-perfumes_accord.dto';

@Injectable()
export class PerfumesAccordsService {
  create(createPerfumesAccordDto: CreatePerfumesAccordDto) {
    return 'This action adds a new perfumesAccord';
  }

  findAll() {
    return `This action returns all perfumesAccords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} perfumesAccord`;
  }

  update(id: number, updatePerfumesAccordDto: UpdatePerfumesAccordDto) {
    return `This action updates a #${id} perfumesAccord`;
  }

  remove(id: number) {
    return `This action removes a #${id} perfumesAccord`;
  }
}
