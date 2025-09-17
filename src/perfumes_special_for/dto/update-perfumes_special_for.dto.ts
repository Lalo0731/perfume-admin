import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfumesSpecialForDto } from './create-perfumes_special_for.dto';

export class UpdatePerfumesSpecialForDto extends PartialType(CreatePerfumesSpecialForDto) {}
