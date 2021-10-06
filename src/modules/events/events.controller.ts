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
    ApiBearerAuth,
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import { EditLocationBody } from './dtos/editLocation.dto';
import { CreateLocationBody } from './dtos/createLocation';

@ApiBearerAuth('API KEY')
@ApiUnauthorizedResponse({ description: 'Invalid credentials' })
@Controller({ version: '1', path: 'eventos' })
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    @ApiOkResponse({ description: 'Consult Events' })
    getMany() {
        return this.eventsService.getMany();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Consult single Event' })
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.getOne(id);
    }

    @Get(':id/ubicacion')
    @ApiOkResponse({ description: 'Consult single Event Location' })
    getLocation(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.getLocation(id);
    }

    @Post()
    @ApiCreatedResponse({ description: 'Event registration' })
    @ApiBody({ type: CreateEventBody })
    createOne(@Body() data: CreateEventBody) {
        return this.eventsService.createOne(data);
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'Edit some single Event fields' })
    @ApiBody({ type: EditEventBody })
    optionalEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: EditEventBody,
    ) {
        return this.eventsService.editOne(id, data);
    }

    @Patch(':id/ubicacion')
    @ApiOkResponse({ description: 'Edit some single Event Location fields' })
    @ApiBody({ type: EditLocationBody })
    optionalLocationEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: EditLocationBody,
    ) {
        return this.eventsService.editLocation(id, data);
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Edit hole single Event' })
    @ApiBody({ type: CreateEventBody })
    hardEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateEventBody,
    ) {
        return this.eventsService.editOne(id, data, true);
    }

    @Put(':id/ubicacion')
    @ApiOkResponse({ description: 'Edit hole single Event Location' })
    @ApiBody({ type: CreateLocationBody })
    hardLocationEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateLocationBody,
    ) {
        return this.eventsService.editLocation(id, data, true);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Remove single Event from queries' })
    deleteOne(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.deleteOne(id);
    }
}
