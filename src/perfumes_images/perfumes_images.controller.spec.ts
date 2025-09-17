import { Test, TestingModule } from '@nestjs/testing';
import { PerfumesImagesController } from './perfumes_images.controller';
import { PerfumesImagesService } from './perfumes_images.service';

describe('PerfumesImagesController', () => {
  let controller: PerfumesImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfumesImagesController],
      providers: [PerfumesImagesService],
    }).compile();

    controller = module.get<PerfumesImagesController>(PerfumesImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
