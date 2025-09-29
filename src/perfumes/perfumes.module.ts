import { Module } from '@nestjs/common';
import { PerfumesService } from './perfumes.service';
import { PerfumesController } from './perfumes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfume } from './entities/perfume.entity';
import { PerfumesAccord } from 'src/perfumes_accords/entities/perfumes_accord.entity';
import { PerfumesSpecialFor } from 'src/perfumes_special_for/entities/perfumes_special_for.entity';
import { PerfumesImage } from 'src/perfumes_images/entities/perfumes_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Perfume,
    PerfumesAccord,
    PerfumesSpecialFor,
    PerfumesImage,
  ])],
  controllers: [PerfumesController],
  providers: [PerfumesService],
})
export class PerfumesModule {}
