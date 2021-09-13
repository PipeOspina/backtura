import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event, Image } from './entitites/event.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Event, Image])],
    controllers: [EventsController],
    providers: [EventsService],
})
export class EventsModule {}
