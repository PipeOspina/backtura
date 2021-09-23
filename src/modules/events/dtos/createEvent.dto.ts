import { Type } from 'class-transformer';
import {
    IsInt,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';
import { CreateLocationBody } from './createLocation';
import { CreateScheduleBody } from './createSchedule.dto';

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

    @IsObject()
    @ValidateNested()
    @Type(() => CreateLocationBody)
    location: CreateLocationBody;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    sponsor?: string; // id reference for intertface Sponsor

    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => CreateScheduleBody)
    schedules: CreateScheduleBody[];

    @IsString()
    category: string; // id reference for intertface EventCategory
}
