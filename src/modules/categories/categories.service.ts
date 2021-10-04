import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Icon } from '../icons/entities/icon.entity';
import { CreateCategory } from './dtos/createCategory.dto';
import { EditCategoryBody } from './dtos/editCategory.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
        @InjectRepository(Icon)
        private readonly iconsRepository: Repository<Icon>,
    ) {}

    async getMany() {
        return this.categoriesRepository.find({ relations: ['icon'] });
    }

    async getOne(id: number) {
        return this.categoriesRepository.findOne(id, { relations: ['icon'] });
    }

    async editOne(id: number, data: EditCategoryBody, hard?: boolean) {
        const { icon, ...body } = data;
        const res = await Promise.all([
            this.categoriesRepository.findOne(id),
            this.iconsRepository.findOne(icon),
        ]);

        const notFound = res.find((element) => !element);

        if (notFound) {
            const error = new NotFoundException();
            throw new NotFoundException(
                res.indexOf(notFound) === 1
                    ? {
                          ...error,
                          response: 'Icon not found',
                      }
                    : undefined,
            );
        }

        if (hard) {
            await this.categoriesRepository
                .createQueryBuilder()
                .update(Category)
                .set({ ...body, icon: res[1] })
                .where('id = :id', { id })
                .execute();
        } else {
            await this.categoriesRepository.update(id, {
                ...body,
                icon: res[1],
            });
        }

        return this.categoriesRepository.findOne(id, { relations: ['icon'] });
    }

    async createOne(data: CreateCategory) {
        const { icon: iconId, ...body } = data;
        const icon = await this.iconsRepository.findOne(iconId);
        if (!icon) {
            const error = new NotFoundException();
            throw new NotFoundException({
                ...error,
                response: 'Icon not found',
            });
        }
        const category = await this.categoriesRepository.create({
            ...body,
            icon,
        });
        await this.categoriesRepository.save(category);
        return category;
    }
}
