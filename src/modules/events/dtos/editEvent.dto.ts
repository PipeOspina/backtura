import { CreateEventBody } from './createEvent.dto';
import { PartialType } from '@nestjs/mapped-types';

export class EditEventBody extends PartialType(CreateEventBody) {}
