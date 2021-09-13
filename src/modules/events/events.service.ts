/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditEventBody } from './dtos/editEvent.dto';
import { CreateEventBody } from './dtos/createEvent.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event, Image } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { EditLocationBody } from './dtos/editLocation.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>,
        @InjectRepository(Image)
        private readonly imagesRepository: Repository<Image>,
        @InjectRepository(Location)
        private readonly locationsRepository: Repository<Location>,
    ) {}

    async getOne(id: number) {
        const event = await this.eventsRepository.findOne(id, {
            relations: ['images', 'location'],
        });
        if (!event) throw new NotFoundException();
        const { images, location, ...data } = event;
        const { id: _, ...loc } = location || {};
        return {
            ...data,
            imageUrls: images?.map(({ url }) => url),
            location: loc,
        };
    }

    async getMany() {
        const res = await this.eventsRepository.find({
            relations: ['images', 'location'],
        });
        return res.map((event) => {
            const { images, location, ...data } = event;
            const { id: _, ...loc } = location || {};
            return {
                ...data,
                imageUrls: images?.map(({ url }) => url),
                location: loc,
            };
        });
    }

    async createOne(data: CreateEventBody) {
        const { imageUrls, location, ...body } = data;

        const event = await this.eventsRepository.create(body);
        const { id, ...loc } = await this.locationsRepository.create(location);
        event.location = { id, ...loc };
        await this.locationsRepository.save({ id, ...loc });
        await this.createImages(event, imageUrls);

        await this.eventsRepository.save(event);
        return { ...event, imageUrls, location: { ...loc } };
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

    async getLocation(eventId: number) {
        const { location } =
            (await this.eventsRepository.findOne(eventId, {
                relations: ['location'],
            })) || {};
        const { id: _, ...loc } = location || {};
        if (!location || !loc) throw new NotFoundException();
        return loc;
    }

    async editLocation(
        eventId: number,
        data: EditLocationBody,
        hard?: boolean,
    ) {
        const { location } =
            (await this.eventsRepository.findOne(eventId, {
                relations: ['location'],
            })) || {};
        if (!location) throw new NotFoundException();
        const { id, ...body } = location;

        if (hard) {
            await this.eventsRepository
                .createQueryBuilder()
                .update(Location)
                .set(data)
                .where('id = :id', { id })
                .execute();
        } else {
            await this.locationsRepository.update(id, data);
        }

        return { ...body, ...data };
    }
}
