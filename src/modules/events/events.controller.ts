import { EditEventBody } from './dtos/editEvent.dto';
import { CreateEventBody } from './dtos/createEvent.dto';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
} from '@nestjs/common';
import { EventsService } from './events.service';

@Controller({ version: '1', path: 'events' })
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    getMany() {
        return this.eventsService.getMany();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.getOne(id);
    }

    @Post()
    createOne(@Body() data: CreateEventBody) {
        return this.eventsService.createOne(data);
    }

    @Patch(':id')
    optionalEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: EditEventBody,
    ) {
        return this.eventsService.editOne(id, data);
    }

    @Put(':id')
    hardEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateEventBody,
    ) {
        return this.eventsService.editOne(id, data, true);
    }

    @Delete(':id')
    deleteOne(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.deleteOne(id);
    }
}
