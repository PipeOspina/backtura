import { CreateEventBody } from './createEvent.dto';
import { PartialType } from '@nestjs/swagger';

export class EditEventBody extends PartialType(CreateEventBody) {}
