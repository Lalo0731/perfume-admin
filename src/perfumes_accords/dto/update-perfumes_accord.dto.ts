import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfumesAccordDto } from './create-perfumes_accord.dto';

export class UpdatePerfumesAccordDto extends PartialType(CreatePerfumesAccordDto) {}
