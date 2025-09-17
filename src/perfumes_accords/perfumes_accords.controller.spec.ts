import { Test, TestingModule } from '@nestjs/testing';
import { PerfumesAccordsController } from './perfumes_accords.controller';
import { PerfumesAccordsService } from './perfumes_accords.service';

describe('PerfumesAccordsController', () => {
  let controller: PerfumesAccordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfumesAccordsController],
      providers: [PerfumesAccordsService],
    }).compile();

    controller = module.get<PerfumesAccordsController>(PerfumesAccordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
