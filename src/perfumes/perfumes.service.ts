import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { Perfume } from './entities/perfume.entity';

import { PerfumesImage } from 'src/perfumes_images/entities/perfumes_image.entity';
import { PerfumesAccord } from 'src/perfumes_accords/entities/perfumes_accord.entity';
import { PerfumesSpecialFor } from 'src/perfumes_special_for/entities/perfumes_special_for.entity';

import * as fs from "fs";
import * as path from "path";

@Injectable()
export class PerfumesService {
  constructor(
    @InjectRepository(Perfume)
    private readonly perfumeRepository: Repository<Perfume>,

    @InjectRepository(PerfumesAccord)
    private readonly accordRepository: Repository<PerfumesAccord>,

    @InjectRepository(PerfumesSpecialFor)
    private readonly specialForRepository: Repository<PerfumesSpecialFor>,

    @InjectRepository(PerfumesImage)
    private readonly imageRepository: Repository<PerfumesImage>
  ){}

  async create(createPerfumeDto: CreatePerfumeDto): Promise<Perfume> {
    const { images, accords, specialFor, ...rest} = createPerfumeDto;

    const perfume = this.perfumeRepository.create({
      ...rest,
    });


  if (images && Array.isArray(images)) {
    perfume.images = images.map((dto) => {
      const img = new PerfumesImage();
      img.image_url = dto.image_url;
      return img;
    });
  }

  if (accords && Array.isArray(accords)) {
    perfume.accords = accords.map((dto) => {
      const acc = new PerfumesAccord();
      acc.accord = dto.accord;
      return acc;
    });
  }

  if (specialFor && Array.isArray(specialFor)) {
    perfume.specialFor = specialFor.map((dto) => {
      const sf = new PerfumesSpecialFor();
      sf.context = dto.context;
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
      relations: ['images', 'accords', 'specialFor']
    });

    if(!perfume){
      throw new Error(`Perfume von ID ${id} no encontrado`);
    }

    const { images, accords, specialFor, ...rest } = updatePerfumeDto;

    Object.assign(perfume, rest);

    // ==================================================
    //  ACTUALIZAR IMÁGENES
    // ==================================================
    if (images) {
    // Borrar las eliminadas
    const toDelete = perfume.images.filter(
      (existente) => !images.some((img) => img.id === existente.id),
    );
    if (toDelete.length > 0) {
      await this.imageRepository.remove(toDelete);
    }

    // Actualizar y agregar
    perfume.images = images.map((imgDto) => {
      if (imgDto.id) {
        const existente = perfume.images.find((i) => i.id === imgDto.id);
        if (existente) {
          existente.image_url = imgDto.image_url;
          return existente;
        }
      }
      const nueva = new PerfumesImage();
      nueva.image_url = imgDto.image_url;
      nueva.perfume = perfume;
      return nueva;
    });
    }


    // ==================================================
    //  ACTUALIZAR ACORDES
    // ==================================================
    if (accords) {
    // Borrar los eliminados
    const toDelete = perfume.accords.filter(
      (existente) => !accords.some((a) => a.id === existente.id),
    );
    if (toDelete.length > 0) {
      await this.accordRepository.remove(toDelete);
    }

    // Actualizar y agregar
    perfume.accords = accords.map((a) => {
      if (a.id) {
        const existente = perfume.accords.find((acc) => acc.id === a.id);
        if (existente) {
          existente.accord = a.accord;
          return existente;
        }
      }
      const nuevo = new PerfumesAccord();
      nuevo.accord = a.accord;
      nuevo.perfume = perfume;
      return nuevo;
    });
    }

    // ==================================================
    //  ACTUALIZAR SPECIAL FOR
    // ==================================================
    if (specialFor) {
    // Borrar los eliminados
    const toDelete = perfume.specialFor.filter(
      (existente) => !specialFor.some((s) => s.id === existente.id),
    );
    if (toDelete.length > 0) {
      await this.specialForRepository.remove(toDelete);
    }

    // Actualizar y agregar
    perfume.specialFor = specialFor.map((s) => {
      if (s.id) {
        const existente = perfume.specialFor.find((sf) => sf.id === s.id);
        if (existente) {
          existente.context = s.context;
          return existente;
        }
      }
      const nuevo = new PerfumesSpecialFor();
      nuevo.context = s.context;
      nuevo.perfume = perfume;
      return nuevo;
    });
    }

    return await this.perfumeRepository.save(perfume);

  }

  async remove(id: number): Promise<void> {
    // Buscar perfume con sus relaciones
    const perfume = await this.perfumeRepository.findOne({
      where: { id },
      relations: ["images", "accords", "specialFor"],
    });

    if (!perfume) {
      throw new Error(`Perfume con ID ${id} no encontrado`);
    }

    // Ruta absoluta hacia la carpeta uploads/perfumes
    const uploadsPath = path.join(__dirname, "..", "..", "uploads", "perfumes");

    // Eliminar físicamente cada archivo relacionado
    for (const img of perfume.images) {
      const filePath = path.join(uploadsPath, img.image_url);
      try {
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
          console.log(`Imagen eliminada: ${filePath}`);
        }
      } catch (err) {
        console.error("Error al eliminar archivo:", filePath, err);
      }
    }

    // Borrar registros relacionados (imágenes, accords, specialFor)
    if (perfume.images.length > 0) {
      await this.imageRepository.remove(perfume.images);
    }
    if (perfume.accords.length > 0) {
      await this.accordRepository.remove(perfume.accords);
    }
    if (perfume.specialFor.length > 0) {
      await this.specialForRepository.remove(perfume.specialFor);
    }

    // Finalmente borrar el perfume de la BD
    await this.perfumeRepository.remove(perfume);
  }
}