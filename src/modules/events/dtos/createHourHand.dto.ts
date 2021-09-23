import { IsDate } from 'class-validator';

export class CreateHourHandBody {
    @IsDate()
    startTime: string;

    @IsDate()
    endTime: string;
}
