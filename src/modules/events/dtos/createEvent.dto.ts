import { Type } from 'class-transformer';
import {
    IsInt,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    Length,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';
import { CreateLocationBody } from './createLocation';
import { CreateScheduleBody } from './createSchedule.dto';

export class CreateEventBody {
    @IsString()
    @Length(1)
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
    @IsNumber()
    sponsor?: number; // id reference for intertface Sponsor

    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => CreateScheduleBody)
    schedules: CreateScheduleBody[];

    @IsNumber()
    category: number; // id reference for intertface EventCategory
}
