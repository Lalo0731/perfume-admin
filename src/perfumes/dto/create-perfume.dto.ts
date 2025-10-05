
import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePerfumesImageDto } from 'src/perfumes_images/dto/create-perfumes_image.dto';
import { CreatePerfumesAccordDto } from 'src/perfumes_accords/dto/create-perfumes_accord.dto';
import { CreatePerfumesSpecialForDto } from 'src/perfumes_special_for/dto/create-perfumes_special_for.dto';

export class CreatePerfumeDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(['arabes','disenador', 'next'])
    category:'arabes' | 'disenador' | 'next';

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    oldPrice?: number;

    @Type(() => Number)
    @IsNumber()
    price: number;

    @IsOptional()
    @IsBoolean()
    isDecantOnly?: boolean;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    priceDecant?: number;

    @IsOptional()
    @IsBoolean()
    isDecant?: boolean;

    @IsOptional()
    @IsBoolean()
    isNew?: boolean;

    @IsOptional()
    @IsBoolean()
    available?: boolean;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePerfumesImageDto)
    images?: CreatePerfumesImageDto[]; 

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePerfumesAccordDto)
    accords?: CreatePerfumesAccordDto[]; 

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePerfumesSpecialForDto)
    specialFor?: CreatePerfumesSpecialForDto[]; 
}
