import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategory } from './dtos/createCategory.dto';
import { EditCategoryBody } from './dtos/editCategory.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) {}
    async getMany() {
        return this.categoriesRepository.find();
    }
    async getOne(id: number) {
        return this.categoriesRepository.findOne(id);
    }
    async editOne(id: number, data: EditCategoryBody, hard?: boolean) {
        const category = await this.categoriesRepository.findOne(id);
        if (!category) throw new NotFoundException();

        if (hard) {
            await this.categoriesRepository
                .createQueryBuilder()
                .update(Category)
                .set(data)
                .where('id = :id', { id: category.id })
                .execute();
        } else {
            await this.categoriesRepository.update(id, data);
        }

        return this.categoriesRepository.findOne(id);
    }
    async createOne(data: CreateCategory) {
        const category = await this.categoriesRepository.create(data);
        await this.categoriesRepository.save(category);
        return category;
    }
}
