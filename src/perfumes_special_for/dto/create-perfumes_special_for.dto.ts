import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePerfumesSpecialForDto {
    @IsOptional()
    @IsNumber()
    id?: number;
  
    @IsString()
    context: string;
}
