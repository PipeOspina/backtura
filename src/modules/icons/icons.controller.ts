import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateIconBody } from './dtos/createIcon.dto';
import { IconsService } from './icons.service';

@Controller({ version: '1', path: 'iconos' })
export class IconsController {
    constructor(private readonly iconsService: IconsService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Icon registration' })
    @ApiBody({ type: CreateIconBody })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    createOne(@Body() body: CreateIconBody) {
        return this.iconsService.createOne(body);
    }
}
