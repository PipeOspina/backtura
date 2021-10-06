import {
    Body,
    Controller,
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
import { CategoriesService } from './categories.service';
import { CreateCategory } from './dtos/createCategory.dto';
import { EditCategoryBody } from './dtos/editCategory.dto';

@Controller({ version: '1', path: 'categorias' })
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    @Get()
    @ApiOkResponse({ description: 'Consult Categories' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    getCategories() {
        return this.categoriesService.getMany();
    }

    @Post()
    @ApiCreatedResponse({ description: 'Category registration' })
    @ApiBody({ type: CreateCategory })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    createCategory(@Body() data: CreateCategory) {
        return this.categoriesService.createOne(data);
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Consult Category' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    getCategory(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.getOne(id);
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Edit hole Category' })
    @ApiBody({ type: CreateCategory })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateCategory,
    ) {
        return this.categoriesService.editOne(id, data, true);
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'Edit some Category fields' })
    @ApiBody({ type: EditCategoryBody })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    optionalEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: EditCategoryBody,
    ) {
        return this.categoriesService.editOne(id, data);
    }
}
