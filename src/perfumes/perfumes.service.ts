import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { Perfume } from './entities/perfume.entity';

import { PerfumesImage } from 'src/perfumes_images/entities/perfumes_image.entity';
import { PerfumesAccord } from 'src/perfumes_accords/entities/perfumes_accord.entity';
import { PerfumesSpecialFor } from 'src/perfumes_special_for/entities/perfumes_special_for.entity';

@Injectable()
export class PerfumesService {
  constructor(
    @InjectRepository(Perfume)
    private readonly perfumeRepository: Repository<Perfume>,
  ){}

  async create(createPerfumeDto: CreatePerfumeDto): Promise<Perfume> {
    const { images, accords, specialFor, ...rest} = createPerfumeDto;

    const perfume = this.perfumeRepository.create({
      ...rest,
    });


  if (images && Array.isArray(images)) {
    perfume.images = images.map((url) => {
      const img = new PerfumesImage();
      img.image_url = url;
      return img;
    });
  }

  if (accords && Array.isArray(accords)) {
    perfume.accords = accords.map((a) => {
      const acc = new PerfumesAccord();
      acc.accord = a;
      return acc;
    });
  }

  if (specialFor && Array.isArray(specialFor)) {
    perfume.specialFor = specialFor.map((s) => {
      const sf = new PerfumesSpecialFor();
      sf.context = s;
      return sf;
    });
  }

    return this.perfumeRepository.save(perfume);
  }

  async findAll(): Promise<Perfume[]> {
    return this.perfumeRepository.find({
      relations: ['images', 'accords', 'specialFor']
    });
  }

  async findOne(id: number): Promise<Perfume | null> {
    return this.perfumeRepository.findOne({
      where: { id },
      relations: ['images', 'accords', 'specialFor']
    });
  }

  async update(id: number, updatePerfumeDto: UpdatePerfumeDto): Promise<Perfume> {
    const perfume = await this.perfumeRepository.findOne({
      where: { id },
      relations: ['images']
    });

    if(!perfume){
      throw new Error(`Perfume von ID ${id} no encontrado`);
    }

    if (updatePerfumeDto.images) {
      perfume.images = updatePerfumeDto.images.map((url) => {
        const image = new PerfumesImage();
        image.image_url = url;
        return image;
      });
    }

    Object.assign(perfume, updatePerfumeDto);
    return this.perfumeRepository.save(perfume);
  }

  async remove(id: number): Promise<void> {
    await this.perfumeRepository.delete(id);
  }
}





/*import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { Perfume } from './entities/perfume.entity';

@Injectable()
export class PerfumesService {
  constructor(
    @InjectRepository(Perfume)
    private readonly perfumeRepository: Repository<Perfume>,
  ){}

  async create(createPerfumeDto: CreatePerfumeDto): Promise<Perfume> {
    const { images, accords, specialFor, ...rest} = createPerfumeDto;

    const perfume = this.perfumeRepository.create({
      ...rest,
    });

    if(images && Array.isArray(images) && images.length > 0) {
      perfume.images = images.map((url: string) => ({ image_url: url }));
    }

    if (accords && Array.isArray(accords) && accords.length > 0) {
      perfume.accords = accords.map((a: string) => ({ accord: a }));
    }

    if (specialFor && Array.isArray(specialFor) && specialFor.length > 0) {
      perfume.specialFor = specialFor.map((s: string) => ({ context: s }));
    }
    return this.perfumeRepository.save(perfume);
  }

  findAll() {
    return `This action returns all perfumes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} perfume`;
  }

  update(id: number, updatePerfumeDto: UpdatePerfumeDto) {
    return `This action updates a #${id} perfume`;
  }

  remove(id: number) {
    return `This action removes a #${id} perfume`;
  }
}*/
