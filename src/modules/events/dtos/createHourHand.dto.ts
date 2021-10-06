import { ApiProperty } from '@nestjs/swagger';
import { IsMilitaryTime } from 'class-validator';

export class CreateHourHandBody {
    @IsMilitaryTime({ message: 'startTime must be formatted like HH:MM' })
    @ApiProperty({ type: String })
    startTime: string;

    @IsMilitaryTime({ message: 'endTime must be formatted like HH:MM' })
    @ApiProperty({ type: String })
    endTime: string;
}
