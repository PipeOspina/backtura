import { Location } from './location.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => Image, (image) => image.event, {
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    images?: Image[];

    @Column('tinyint', { name: 'min_age', nullable: true })
    minAge?: number;

    @OneToOne(() => Location)
    @JoinColumn({ name: 'location_id' })
    location: Location;

    @Column('decimal', { nullable: true })
    price?: number;

    @Column({ nullable: true })
    sponsor?: string; // id reference for intertface Sponsor

    @OneToMany(() => Schedule, (schedule) => schedule.event, {
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    schedules: Schedule[];

    @Column()
    category: string; // id reference for intertface EventCategory

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

    @CreateDateColumn({
        name: 'created_at',
        type: 'datetime',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'datetime',
    })
    updatedAt: Date;
}

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event, (event) => event.images)
    @JoinColumn({ name: 'event_id' })
    event: Event;

    @Column()
    url: string;
}
