import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreatePerfumesAccordDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsString()
    accord: string;
}
