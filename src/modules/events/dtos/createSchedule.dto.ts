import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsObject, ValidateNested } from 'class-validator';
import { CreateHourHandBody } from './createHourHand.dto';

export class CreateScheduleBody {
    @IsDateString({}, { message: 'startDate must be formatted as AAAA-MM-DD' })
    @ApiProperty({ type: String })
    startDate: string;

    @IsDateString({}, { message: 'endDate must be formatted as AAAA-MM-DD' })
    @ApiProperty({ type: String })
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
    @ApiProperty({ type: [CreateHourHandBody] })
    @Type(() => CreateHourHandBody)
    hourHands: CreateHourHandBody[];
}
