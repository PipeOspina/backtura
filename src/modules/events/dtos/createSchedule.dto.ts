import { Type } from 'class-transformer';
import { IsDateString, IsObject, ValidateNested } from 'class-validator';
import { CreateHourHandBody } from './createHourHand.dto';

export class CreateScheduleBody {
    @IsDateString({}, { message: 'startDate must be formatted as AAAA-MM-DD' })
    startDate: string;

    @IsDateString({}, { message: 'endDate must be formatted as AAAA-MM-DD' })
    endDate: string;

    @IsObject({
        each: true,
        message: 'hourHands must be formatted as an Hour Hand array',
    })
    @ValidateNested({
        each: true,
        message:
            'each value in nested property hourHands must be formatted as an Hour Hand',
    })
    @Type(() => CreateHourHandBody)
    hourHands: CreateHourHandBody[];
}
