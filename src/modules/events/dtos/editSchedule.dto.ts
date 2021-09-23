import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleBody } from './createSchedule.dto';

export class EditScheduleBody extends PartialType(CreateScheduleBody) {}
