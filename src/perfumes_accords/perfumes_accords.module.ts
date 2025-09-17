import { Module } from '@nestjs/common';
import { PerfumesAccordsService } from './perfumes_accords.service';
import { PerfumesAccordsController } from './perfumes_accords.controller';

@Module({
  controllers: [PerfumesAccordsController],
  providers: [PerfumesAccordsService],
})
export class PerfumesAccordsModule {}
