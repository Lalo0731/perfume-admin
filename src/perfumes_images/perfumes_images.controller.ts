import { 
  Controller, Get, Post, Body, Patch, Param, Delete, 
  UploadedFiles, UseInterceptors, UploadedFile, Put 
} from '@nestjs/common';
import { PerfumesImagesService } from './perfumes_images.service';
import { CreatePerfumesImageDto } from './dto/create-perfumes_image.dto';
import { UpdatePerfumesImageDto } from './dto/update-perfumes_image.dto';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import type { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('perfumes-images')
export class PerfumesImagesController {
  constructor(private readonly perfumesImagesService: PerfumesImagesService) {}

  @Post('upload/:perfumeId')
  @UseInterceptors(
    FilesInterceptor('files', 3, {  
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = path.resolve('./uploads/perfumes');
          if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          callback(null, uploadPath);
        },
        filename: (req, file, callback) =>{
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        }
      }),
    }),
  )
  
  async uploadImage(
    @Param('perfumeId') perfumeId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const savedImages = await Promise.all(
      files.map((file) => 
      this.perfumesImagesService.create({
        image_url: file.filename,
        perfume: { id: perfumeId } as any,
      }),
      )
    );
    return{ 
      message: 'Imágenes subidas correctamente',
      images: savedImages,
    }
  }

  @Post()
  create(@Body() createPerfumesImageDto: CreatePerfumesImageDto) {
    return this.perfumesImagesService.createFromDto(createPerfumesImageDto);
  }

  @Get()
  findAll() {
    return this.perfumesImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfumesImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfumesImageDto: UpdatePerfumesImageDto) {
    return this.perfumesImagesService.update(+id, updatePerfumesImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfumesImagesService.remove(+id);
  }

  @Put(':id/replace')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/perfumes',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async replaceImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = await this.perfumesImagesService.findOne(+id);

    if(!image){
      throw new Error('Imagen no encontrada');
    }

    const oldPath = join(process.cwd(), 'uploads/perfumes', image.image_url);
    if(fs.existsSync(oldPath)){
      fs.unlinkSync(oldPath);
    }

    const newFileName = file.filename;
    image.image_url = newFileName;

    // image.image_url = file.filename;
    await this.perfumesImagesService.update(+id, image);
    return{
      message: "Imagen reemplazada con éxito",
      newImageUrl: newFileName,
    }
  }
}
