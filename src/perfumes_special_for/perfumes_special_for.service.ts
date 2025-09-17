import { Injectable } from '@nestjs/common';
import { CreatePerfumesSpecialForDto } from './dto/create-perfumes_special_for.dto';
import { UpdatePerfumesSpecialForDto } from './dto/update-perfumes_special_for.dto';

@Injectable()
export class PerfumesSpecialForService {
  create(createPerfumesSpecialForDto: CreatePerfumesSpecialForDto) {
    return 'This action adds a new perfumesSpecialFor';
  }

  findAll() {
    return `This action returns all perfumesSpecialFor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} perfumesSpecialFor`;
  }

  update(id: number, updatePerfumesSpecialForDto: UpdatePerfumesSpecialForDto) {
    return `This action updates a #${id} perfumesSpecialFor`;
  }

  remove(id: number) {
    return `This action removes a #${id} perfumesSpecialFor`;
  }
}
