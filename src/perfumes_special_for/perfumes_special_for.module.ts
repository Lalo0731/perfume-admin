import { Module } from '@nestjs/common';
import { PerfumesSpecialForService } from './perfumes_special_for.service';
import { PerfumesSpecialForController } from './perfumes_special_for.controller';

@Module({
  controllers: [PerfumesSpecialForController],
  providers: [PerfumesSpecialForService],
})
export class PerfumesSpecialForModule {}
