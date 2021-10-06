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
import { ApiProperty } from '@nestjs/swagger';
import { CreateLocationBody } from './createLocation';
import { CreateScheduleBody } from './createSchedule.dto';

export class CreateEventBody {
    @IsString()
    @Length(1)
    @ApiProperty({ type: String })
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, nullable: true })
    description?: string;

    @IsOptional()
    @IsString({ each: true })
    @ApiProperty({ type: () => [String], nullable: true })
    imageUrls?: string[];

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(110)
    @ApiProperty({ type: Number, nullable: true })
    minAge?: number;

    @IsObject()
    @ValidateNested()
    @Type(() => CreateLocationBody)
    @ApiProperty({ type: CreateLocationBody })
    location: CreateLocationBody;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ type: Number, nullable: true })
    price?: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ type: Number, nullable: true })
    sponsor?: number; // id reference for intertface Sponsor

    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => CreateScheduleBody)
    @ApiProperty({ type: [CreateScheduleBody] })
    schedules: CreateScheduleBody[];

    @IsNumber()
    @ApiProperty({ type: Number })
    category: number; // id reference for intertface EventCategory
}
