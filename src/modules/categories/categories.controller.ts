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
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryBody } from './dtos/createCategory.dto';
import { EditCategoryBody } from './dtos/editCategory.dto';

@ApiBearerAuth('API KEY')
@ApiUnauthorizedResponse({ description: 'Invalid credentials' })
@Controller({ version: '1', path: 'categorias' })
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    @Get()
    @ApiOkResponse({ description: 'Consult Categories' })
    getCategories() {
        return this.categoriesService.getMany();
    }

    @Post()
    @ApiCreatedResponse({ description: 'Category registration' })
    @ApiBody({ type: CreateCategoryBody })
    createCategory(@Body() data: CreateCategoryBody) {
        return this.categoriesService.createOne(data);
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Consult Category' })
    getCategory(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.getOne(id);
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Edit hole Category' })
    @ApiBody({ type: CreateCategoryBody })
    updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateCategoryBody,
    ) {
        return this.categoriesService.editOne(id, data, true);
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'Edit some Category fields' })
    @ApiBody({ type: EditCategoryBody })
    optionalEdit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: EditCategoryBody,
    ) {
        return this.categoriesService.editOne(id, data);
    }
}
