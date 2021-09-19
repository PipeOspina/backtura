import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationBody } from '../events/dtos/createLocation';
import { CreateCategory } from './dtos/createCategory.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>
    ){}
    async getMany(){
        return this.categoriesRepository.find();
    }
    async createOne(data: CreateCategory){
        const category = await this.categoriesRepository.create(data);
        await this.categoriesRepository.save(category)
        return category;
    }
}
