/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditEventBody } from './dtos/editEvent.dto';
import { CreateEventBody } from './dtos/createEvent.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event, Image } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { EditLocationBody } from './dtos/editLocation.dto';
import { CreateScheduleBody } from './dtos/createSchedule.dto';
import { Schedule } from './entities/schedule.entity';
import { CreateLocationBody } from './dtos/createLocation';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>,
        @InjectRepository(Image)
        private readonly imagesRepository: Repository<Image>,
        @InjectRepository(Location)
        private readonly locationsRepository: Repository<Location>,
        @InjectRepository(Schedule)
        private readonly schedulesRepository: Repository<Schedule>,
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) {}

    async getOne(id: number) {
        const event = await this.eventsRepository.findOne(
            { id, isActive: true },
            {
                relations: ['images', 'location', 'schedules'],
            },
        );
        if (!event) throw new NotFoundException();
        const { images, location, schedules, ...data } = event;
        const { id: _, ...loc } = location || {};

        const sched =
            schedules?.map(({ id: _, hourHands, ...schedule }) => ({
                ...schedule,
                hourHands: hourHands?.map(({ id: _, ...hourHand }) => hourHand),
            })) || [];
        return {
            ...data,
            imageUrls: images?.map(({ url }) => url),
            location: loc,
            schedules: sched,
        };
    }

    async getMany() {
        const res = await this.eventsRepository.find({
            where: { isActive: true },
            relations: ['images', 'location', 'schedules', 'category'],
        });
        return res.map((event) => {
            const { images, location, schedules, category, ...data } = event;
            const { id: _, ...loc } = location || {};
            const { id: categoryId } = category || {};
            const sched =
                schedules?.map(({ id: _, hourHands, ...schedule }) => ({
                    ...schedule,
                    hourHands: hourHands?.map(
                        ({ id: _, ...hourHand }) => hourHand,
                    ),
                })) || [];
            return {
                ...data,
                category: categoryId,
                imageUrls: images?.map(({ url }) => url),
                location: loc,
                schedules: sched,
            };
        });
    }

    async createOne(data: CreateEventBody) {
        const { imageUrls, location, schedules, category, ...body } = data;

        const event = await this.eventsRepository.create(body);
        await this.nestCategory(event, category);
        const { id } = await this.eventsRepository.save(event);

        this.createLocation(id, location);
        this.createImages(event, imageUrls);
        this.createSchedules(event, schedules);

        return { ...event, category, imageUrls, schedules, location };
    }

    async editOne(id: number, data: EditEventBody, hard?: boolean) {
        const event = await this.eventsRepository.findOne({
            id,
            isActive: true,
        });
        if (!event) throw new NotFoundException();

        const { imageUrls, location, schedules, category, ...body } = data;
        category && (await this.nestCategory(event, category));
        location && this.editLocation(id, location, hard);
        this.createImages(event, imageUrls, true);
        this.createSchedules(event, schedules, true);

        if (hard) {
            this.eventsRepository
                .createQueryBuilder()
                .update(Event)
                .set(body)
                .where('id = :id', { id: event.id })
                .execute()
                .then();
        } else {
            this.eventsRepository.update(id, body).then();
        }

        return { ...event, ...body, imageUrls };
    }

    async deleteOne(id: number) {
        const event = await this.eventsRepository.findOne({
            id,
            isActive: true,
        });
        if (!event) throw new NotFoundException();
        await this.eventsRepository.update(id, { isActive: false });
        return true;
    }

    async createLocation(eventId: number, location: CreateLocationBody) {
        const loc = await this.locationsRepository.create(location);
        await this.locationsRepository.save(loc);
        await this.eventsRepository.update(eventId, { location: loc });
    }

    async createImages(event: Event, images?: string[], edit?: boolean) {
        if (images) {
            edit && (await this.imagesRepository.delete({ event }));
            await Promise.all(
                images.map(async (url) => {
                    const image = await this.imagesRepository.create({
                        url,
                    });
                    image.event = event;
                    await this.imagesRepository.save(image);
                }),
            );
        }
    }

    async createSchedules(
        event: Event,
        schedules?: CreateScheduleBody[],
        edit?: boolean,
    ) {
        if (schedules) {
            edit && (await this.imagesRepository.delete({ event }));
            await Promise.all(
                schedules.map(async (schedule) => {
                    const object = await this.schedulesRepository.create(
                        schedule,
                    );
                    object.event = event;
                    await this.schedulesRepository.save(object);
                }),
            );
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

    async getSchedules(eventId: number) {
        const { schedules } =
            (await this.eventsRepository.findOne(eventId, {
                relations: ['schedules'],
            })) || {};
        const res = schedules.map(({ id: _, hourHands, ...schedule }) => ({
            ...schedule,
            hourHands: hourHands.map(({ id: _, ...hourHand }) => hourHand),
        }));
        if (!schedules || !res.length) throw new NotFoundException();
        return res;
    }

    async nestCategory(event: Event, id: number) {
        const category = await this.categoriesRepository.findOne(id);
        if (!category) {
            const error = new NotFoundException();
            throw new NotFoundException({
                ...error,
                response: 'Category not found',
            });
        }
        event.category = category;
    }
}
