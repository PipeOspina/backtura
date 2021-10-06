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
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import { EditLocationBody } from './dtos/editLocation.dto';
import { CreateLocationBody } from './dtos/createLocation';

@Controller({ version: '1', path: 'eventos' })
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    @ApiOkResponse({ description: 'Consult Events' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    getMany() {
        return this.eventsService.getMany();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Consult single Event' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.getOne(id);
    }

    @Get(':id/ubicacion')
    @ApiOkResponse({ description: 'Consult single Event Location' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    getLocation(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.getLocation(id);
    }

    @Post()
    @ApiCreatedResponse({ description: 'Event registration' })
    @ApiBody({ type: CreateEventBody })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    createOne(@Body() data: CreateEventBody) {
        return this.eventsService.createOne(data);
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'Edit some single Event fields' })
    @ApiBody({ type: EditEventBody })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    optionalEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: EditEventBody,
    ) {
        return this.eventsService.editOne(id, data);
    }

    @Patch(':id/ubicacion')
    @ApiOkResponse({ description: 'Edit some single Event Location fields' })
    @ApiBody({ type: EditLocationBody })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    optionalLocationEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: EditLocationBody,
    ) {
        return this.eventsService.editLocation(id, data);
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Edit hole single Event' })
    @ApiBody({ type: CreateEventBody })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    hardEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateEventBody,
    ) {
        return this.eventsService.editOne(id, data, true);
    }

    @Put(':id/ubicacion')
    @ApiOkResponse({ description: 'Edit hole single Event Location' })
    @ApiBody({ type: CreateLocationBody })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    hardLocationEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateLocationBody,
    ) {
        return this.eventsService.editLocation(id, data, true);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Remove single Event from queries' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    deleteOne(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.deleteOne(id);
    }
}
