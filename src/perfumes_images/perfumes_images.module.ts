import { Module } from '@nestjs/common';
import { PerfumesImagesService } from './perfumes_images.service';
import { PerfumesImagesController } from './perfumes_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfumesImage } from './entities/perfumes_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerfumesImage])],
  controllers: [PerfumesImagesController],
  providers: [PerfumesImagesService],
  exports: [PerfumesImagesService],
})
export class PerfumesImagesModule {}
