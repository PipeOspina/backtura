import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event, Image } from './entities/event.entity';
import { Location } from './entities/location.entity';
import { Schedule } from './entities/schedule.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event, Image, Location, Schedule, Category]),
    ],
    controllers: [EventsController],
    providers: [EventsService],
})
export class EventsModule {}
