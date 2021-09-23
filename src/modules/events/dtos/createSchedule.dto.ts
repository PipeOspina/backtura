import { Type } from 'class-transformer';
import {
    IsDateString,
    IsObject,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { CreateHourHandBody } from './createHourHand.dto';

export class CreateScheduleBody {
    @IsDateString({}, { message: 'startDate must be formatted as AAAA-MM-DD' })
    startDate: string;

    @IsDateString({}, { message: 'endDate must be formatted as AAAA-MM-DD' })
    endDate: string;

    @IsOptional()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => CreateHourHandBody)
    hourHands?: CreateHourHandBody[];
}
