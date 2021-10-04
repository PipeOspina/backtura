import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Icon } from './entities/icon.entity';
import { Repository } from 'typeorm';
import { CreateIconBody } from './dtos/createIcon.dto';

@Injectable()
export class IconsService {
    constructor(
        @InjectRepository(Icon)
        private readonly eventsRepository: Repository<Icon>,
    ) {}

    async createOne(data: CreateIconBody) {
        const icon = await this.eventsRepository.create(data);
        await this.eventsRepository.save(icon);
        return icon;
    }
}
