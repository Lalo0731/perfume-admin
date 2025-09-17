
import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePerfumeDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(['arabe','diseñador', 'next'])
    category:'arabe' | 'diseñador' | 'next';

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

    // Relaciones: el frontend enviará arreglos de strings (URLs / textos).
    // En el service los transformamos a las entidades relacionadas.
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[]; // array de urls o nombres de imagen

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    accords?: string[]; // ej: ["amaderado","cítrico"]

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    specialFor?: string[]; // ej: ["Día","Noche","Primavera"]
    }
