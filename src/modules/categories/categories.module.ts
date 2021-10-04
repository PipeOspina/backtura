import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icon } from '../icons/entities/icon.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Icon])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {}
