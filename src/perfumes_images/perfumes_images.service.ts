import { Injectable } from '@nestjs/common';
import { CreatePerfumesImageDto } from './dto/create-perfumes_image.dto';
import { UpdatePerfumesImageDto } from './dto/update-perfumes_image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfumesImage } from './entities/perfumes_image.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class PerfumesImagesService {
  constructor(
    @InjectRepository(PerfumesImage)
    private perfumesImageRepository: Repository<PerfumesImage>,
  ){}

  create(data: DeepPartial<PerfumesImage>) {
    const newImage = this.perfumesImageRepository.create(data);
    return this.perfumesImageRepository.save(newImage);
  }

  createFromDto(dto: CreatePerfumesImageDto){
    const newImage = this.perfumesImageRepository.create(dto);
    return this.perfumesImageRepository.save(newImage);
  }

  findAll() {
    return this.perfumesImageRepository.find();
  }

  findOne(id: number) {
    return this.perfumesImageRepository.findOneBy({ id });
  }

  update(id: number, updatePerfumesImageDto: UpdatePerfumesImageDto) {
    return this.perfumesImageRepository.update(id, updatePerfumesImageDto);
  }

  remove(id: number) {
    return this.perfumesImageRepository.delete(id);
  }
}
