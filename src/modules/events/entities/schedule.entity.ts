import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('datetime', { name: 'start_date' })
    startDate: Date;

    @Column('datetime', { name: 'end_date' })
    endDate: Date;

    @OneToMany(() => HourHand, (hourHand) => hourHand.schedule, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    hourHands: HourHand[];

    @ManyToOne(() => Event, (event) => event.schedules)
    @JoinColumn({ name: 'event_id' })
    event: Event;
}

@Entity('hour_hands')
export class HourHand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('time', { name: 'start_time' })
    startTime: string;

    @Column('time', { name: 'end_time' })
    endTime: string;

    @ManyToOne(() => Schedule, (schedule) => schedule.hourHands)
    @JoinColumn({ name: 'schedule_id' })
    schedule: Schedule;
}
