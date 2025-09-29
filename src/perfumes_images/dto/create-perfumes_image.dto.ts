import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreatePerfumesImageDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsString()
    image_url: string;
}
