import { Test, TestingModule } from '@nestjs/testing';
import { PerfumesController } from './perfumes.controller';
import { PerfumesService } from './perfumes.service';

describe('PerfumesController', () => {
  let controller: PerfumesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfumesController],
      providers: [PerfumesService],
    }).compile();

    controller = module.get<PerfumesController>(PerfumesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
