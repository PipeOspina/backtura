import { Body, Controller, Post } from '@nestjs/common';
import { CreateIconBody } from './dtos/createIcon.dto';
import { IconsService } from './icons.service';

@Controller({ version: '1', path: 'icons' })
export class IconsController {
    constructor(private readonly iconsService: IconsService) {}

    @Post()
    createOne(@Body() body: CreateIconBody) {
        return this.iconsService.createOne(body);
    }
}
