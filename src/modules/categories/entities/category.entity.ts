import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Icon } from '../../icons/entities/icon.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @ManyToOne(() => Icon, ({ id }) => id)
    icon: Icon;

    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => Event, ({ id }) => id)
    event: number;

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
