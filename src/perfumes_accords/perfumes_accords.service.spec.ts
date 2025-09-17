import { Test, TestingModule } from '@nestjs/testing';
import { PerfumesAccordsService } from './perfumes_accords.service';

describe('PerfumesAccordsService', () => {
  let service: PerfumesAccordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfumesAccordsService],
    }).compile();

    service = module.get<PerfumesAccordsService>(PerfumesAccordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
