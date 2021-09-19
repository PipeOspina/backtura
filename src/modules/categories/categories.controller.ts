import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategory } from './dtos/createCategory.dto';

@Controller({ version: '1', path: 'categorias' })
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    @Get()
    getCategories(){
        return this.categoriesService.getMany();
    }

    @Post()
    createCategory(@Body() data: CreateCategory){
        return this.categoriesService.createOne(data);
    }

    @Get(':id')
    getCategory(@Param('id', ParseIntPipe) id: number){
        return this.categoriesService.getOne(id);
    }

}


