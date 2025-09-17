import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfumesImageDto } from './create-perfumes_image.dto';

export class UpdatePerfumesImageDto extends PartialType(CreatePerfumesImageDto) {}
