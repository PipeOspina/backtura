import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Icon } from './entities/icon.entity';
import { Repository } from 'typeorm';
import { CreateIconBody } from './dtos/createIcon.dto';

@Injectable()
export class IconsService {
    constructor(
        @InjectRepository(Icon)
        private readonly iconsRepository: Repository<Icon>,
    ) {}

    async createOne(data: CreateIconBody) {
        const icon = await this.iconsRepository.create(data);
        await this.iconsRepository.save(icon);
        return icon;
    }

    async deleteOne(id: number) {
        return await this.iconsRepository.delete({ id });
    }
}
