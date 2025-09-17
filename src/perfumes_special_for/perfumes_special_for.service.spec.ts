import { Test, TestingModule } from '@nestjs/testing';
import { PerfumesSpecialForService } from './perfumes_special_for.service';

describe('PerfumesSpecialForService', () => {
  let service: PerfumesSpecialForService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfumesSpecialForService],
    }).compile();

    service = module.get<PerfumesSpecialForService>(PerfumesSpecialForService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
