import { PartialType } from '@nestjs/swagger';
import { CreateScheduleBody } from './createSchedule.dto';

export class EditScheduleBody extends PartialType(CreateScheduleBody) {}
