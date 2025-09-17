import { Test, TestingModule } from '@nestjs/testing';
import { PerfumesImagesService } from './perfumes_images.service';

describe('PerfumesImagesService', () => {
  let service: PerfumesImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfumesImagesService],
    }).compile();

    service = module.get<PerfumesImagesService>(PerfumesImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
