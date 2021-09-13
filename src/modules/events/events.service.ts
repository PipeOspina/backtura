import { EditEventBody } from './dtos/editEvent.dto';
import { CreateEventBody } from './dtos/createEvent.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event, Image } from './entitites/event.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>,
        @InjectRepository(Image)
        private readonly imagesRepository: Repository<Image>,
    ) {}

    async getOne(id: number) {
        const event = await this.eventsRepository.findOne(id, {
            relations: ['images'],
        });
        if (!event) throw new NotFoundException();
        const { images, ...data } = event;
        return {
            ...data,
            imageUrls: images?.map(({ url }) => url),
        };
    }

    async getMany() {
        const res = await this.eventsRepository.find({
            relations: ['images'],
        });
        return res.map((event) => {
            const { images, ...data } = event;
            return {
                ...data,
                imageUrls: images?.map(({ url }) => url),
            };
        });
    }

    async createOne(data: CreateEventBody) {
        const { imageUrls, ...body } = data;

        const event = await this.eventsRepository.create(body);
        this.createImages(event, imageUrls);

        await this.eventsRepository.save(event);
        return { ...event, imageUrls };
    }

    async editOne(id: number, data: EditEventBody, hard?: boolean) {
        const event = await this.eventsRepository.findOne(id);
        if (!event) throw new NotFoundException();

        const { imageUrls, ...body } = data;
        this.createImages(event, imageUrls, true);

        if (hard) {
            !imageUrls && (await this.imagesRepository.delete({ event }));
            await this.eventsRepository
                .createQueryBuilder()
                .update(Event)
                .set(body)
                .where('id = :id', { id: event.id })
                .execute();
        } else {
            await this.eventsRepository.update(id, body);
        }

        return { ...event, ...body, imageUrls };
    }

    async deleteOne(id: number) {
        const event = await this.eventsRepository.findOne(id);
        if (!event) throw new NotFoundException();
        await this.imagesRepository.delete({ event });
        await this.eventsRepository.delete({ id });
        return true;
    }

    async createImages(event: Event, images?: string[], edit?: boolean) {
        if (images) {
            edit && (await this.imagesRepository.delete({ event }));
            images.forEach(async (url) => {
                const image = await this.imagesRepository.create({
                    url,
                });
                image.event = event;
                await this.imagesRepository.save(image);
            });
        }
    }
}
