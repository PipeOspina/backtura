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
import { EditLocationBody } from './dtos/editLocation.dto';
import { CreateLocationBody } from './dtos/createLocation';

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

    @Get(':id/location')
    getLocation(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.getLocation(id);
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

    @Patch(':id/location')
    optionalLocationEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: EditLocationBody,
    ) {
        return this.eventsService.editLocation(id, data);
    }

    @Put(':id')
    hardEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateEventBody,
    ) {
        return this.eventsService.editOne(id, data, true);
    }

    @Put(':id/location')
    hardLocationEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateLocationBody,
    ) {
        return this.eventsService.editLocation(id, data, true);
    }

    @Delete(':id')
    deleteOne(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.deleteOne(id);
    }
}
