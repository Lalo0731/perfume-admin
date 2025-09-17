import { Test, TestingModule } from '@nestjs/testing';
import { PerfumesSpecialForController } from './perfumes_special_for.controller';
import { PerfumesSpecialForService } from './perfumes_special_for.service';

describe('PerfumesSpecialForController', () => {
  let controller: PerfumesSpecialForController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfumesSpecialForController],
      providers: [PerfumesSpecialForService],
    }).compile();

    controller = module.get<PerfumesSpecialForController>(PerfumesSpecialForController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
