import {
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateEventBody {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString({ each: true })
    imageUrls?: string[];

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(110)
    minAge?: number;

    @IsString()
    location: string; // id reference for intertface Location

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    sponsor?: string; // id reference for intertface Sponsor

    @IsString()
    schedule: string; // id reference for intertface Schedule

    @IsString()
    category: string; // id reference for intertface EventCategory
}
