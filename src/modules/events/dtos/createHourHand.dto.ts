import { IsMilitaryTime } from 'class-validator';

export class CreateHourHandBody {
    @IsMilitaryTime({ message: 'startTime must be formatted like HH:MM' })
    startTime: string;

    @IsMilitaryTime({ message: 'endTime must be formatted like HH:MM' })
    endTime: string;
}
